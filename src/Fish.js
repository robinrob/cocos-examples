var Fish = DynamicBody.extend({
    body: null,
    shape: null,

    ctor:function(pos, size, mass, space) {
        cc.log("Ball.ctor ...")
        this._super(pos, size, mass, space)

        this.color = cc.color(255, 0, 0, 255)

        this.init()
    },

    init: function() {
        this._super()

        if (rss.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.physics == rss.box2D) {
            this.initBox2D()
        }
    },

    initChipmunk: function() {
        cc.log("Ball.init ...")
        this._super()

        this.sprite = new cc.PhysicsSprite(rss.res.fish1_png)
        this.addChild(this.sprite)
        this.size = this.sprite.getContentSize()

        this.body = new cp.Body(10, cp.momentForCircle(10, 0, this.size.width / 2, cp.v(0,0)));
        this.body.setPos(this.startPos)
        this.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));//run speed
        this.space.addBody(this.body);

        this.sprite.setBody(this.body)

        this.shape = new cp.CircleShape(this.body, this.size.width / 2, cp.v(0,0))
        this.shape.setElasticity(0.8)
        this.space.addShape(this.shape)
    },

    initBox2D: function() {
        this.sprite = cc.Sprite.create(rss.res.fish1_png)
        this.size = this.sprite.getContentSize()
        this.addChild(this.sprite, 0)

        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef
        fixtureDef.density = 1.0
        fixtureDef.friction = 0.5
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
        fixtureDef.shape.SetAsBox(this.size.width, this.size.height)

        var bodyDef = new Box2D.Dynamics.b2BodyDef
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
        bodyDef.position.Set(this.startPos.x, this.startPos.y)

        this.sprite.setPosition(this.startPos.x, this.startPos.y)

        bodyDef.userData = {
            type: "fish",
            asset: this.sprite
        }

        this.body = this.space.CreateBody(bodyDef)
        this.body.CreateFixture(fixtureDef)
    },

    update: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                this.updateChipmunk()
                break;
            case rss.box2D:
                this.updateBox2D()
                break;
        }
    },

    updateChipmunk:function() {},

    updateBox2D: function() {
        var sprite = this.body.GetUserData().asset
        var p = this.body.GetPosition()
        sprite.setPosition(p.x, p.y)
        sprite.setRotation(-1 * cc.radiansToDegrees(this.body.GetAngle()))
    }
})