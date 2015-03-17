rss.CircBody = rss._DynamicBody.extend({
    ctor: function(pos, radius, mass, space) {
        this._super(pos, cc.size(radius * 2, radius * 2), mass, space)

        this.radius = radius

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

        this.body = new cp.Body(this.mass, cp.momentForCircle(this.mass, 0, this.radius, cp.v(0,0)))
        this.body.setPos(this.startPos)
        this.space.addBody(this.body)

        this.shape = new cp.CircleShape(this.body, this.radius, cp.v(0, 0))
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
    }
})