var Ball = Part.extend({
    _draw: null,
    body: null,
    shape: null,

    ctor:function(pos, size, mass, space) {
        cc.log("Ball.ctor ...")
        this._super(pos, size, mass, space)

        this.radius = this.size.width / 2

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
        this._draw = new cc.DrawNode()
        this.addChild(this._draw)
        this.draw()
    },

    initChipmunk: function() {
        cc.log("Ball.init ...")
        this._super()

        var angle = Math.random() * 360

        // ball physics
        this.body = new cp.Body(this.mass, cp.momentForCircle(this.mass, 0, this.radius, cp.v(0,0)))
        this.body.p = cc.p(this.startPos.x, this.startPos.y)
        this.body.setAngle(angle)
        this.body.applyImpulse(cp.v(300, 0), cp.v(0, 0))//run speed
        this.space.addBody(this.body)

        // ball collision model
        this.shape = new cp.CircleShape(this.body, this.radius, cp.v(0, 0))
        this.shape.setElasticity(1.0)
        this.space.addShape(this.shape)
    },

    initBox2D: function() {
        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef
        fixtureDef.density = 1.0
        fixtureDef.friction = 0.5
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
        fixtureDef.shape.SetAsBox(this.radius, this.radius)

        var bodyDef = new Box2D.Dynamics.b2BodyDef
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
        bodyDef.position.Set(this.startPos.x, this.startPos.y)
        bodyDef.userData = { type: "ball" }

        this.body = this.space.CreateBody(bodyDef)
        this.body.CreateFixture(fixtureDef)
    },

    draw:function() {
        this._draw.clear()
        this._draw.drawDot(this.getPos(), this.radius, this.color)
    },

    update:function() {
        var winSize = cc.director.getWinSize()
        var x = this.getPos().x
        var y = this.getPos().y

        if (x > winSize.width) {
            this.setPos(cc.p(0, y))
            this.setVel(cp.v(this.getVel().x, 0))
        }
        // Reset to right-side of screen
        else if (x < 0) {
            this.setPos(cc.p(winSize.width, y))
            this.setVel(cp.v(this.getVel().x, 0))
        }

        this.draw()
    }
})