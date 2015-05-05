var Fish = rss._DynamicBody.extend({
    ctor:function(args) {
        cc.log("Ball.ctor ...")
        this._super(args)

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
        this.r.size = this.sprite.getContentSize()

        this.r.body = new cp.Body(10, cp.momentForCircle(10, 0, this.r.size.width / 2, cp.v(0,0)));
        this.r.body.setPos(this.r.startPos)
        this.r.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));//run speed

        this.sprite.setBody(this.r.body)

        this.r.shape = new cp.CircleShape(this.r.body, this.r.size.width / 2, cp.v(0,0))
        this.r.shape.setElasticity(0.8)
    },

    initBox2D: function() {
        this.sprite = cc.Sprite.create(rss.res.fish1_png)
        this.r.size = this.sprite.getContentSize()
        this.addChild(this.sprite, 0)

        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef
        fixtureDef.density = 1.0
        fixtureDef.friction = 0.5
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
        fixtureDef.shape.SetAsBox(this.r.size.width, this.r.size.height)

        var bodyDef = new Box2D.Dynamics.b2BodyDef
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
        bodyDef.position.Set(this.r.startPos.x, this.r.startPos.y)

        this.sprite.setPosition(this.r.startPos.x, this.r.startPos.y)

        bodyDef.userData = {
            type: "fish",
            asset: this.sprite
        }

        this.r.body = this.r.space.CreateBody(bodyDef)
        this.r.body.CreateFixture(fixtureDef)
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
        var sprite = this.r.body.GetUserData().asset
        var p = this.r.body.GetPosition()
        sprite.setPosition(p.x, p.y)
        sprite.setRotation(-1 * cc.radiansToDegrees(this.r.body.GetAngle()))
    }
})