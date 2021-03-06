rss.CircBody = rss.DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius * 2, args.radius * 2)
        this._super(args)

        this.r.offset = args.offset || 0
        this.r.radius = args.radius

        this.r.segments = args.segments
    },

    init: function() {
        this._super()

        if (rss.config.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.config.physics == rss.box2D) {
            this.initBox2D()
        }

        return this
    },

    initChipmunk: function() {
        //cc.log("Ball.init ...")
        this._super()

        this.r.body = new cp.Body(this.r.mass, cp.momentForCircle(this.r.mass, 0, this.r.radius, cp.v(0,0)))
        this.r.body.setPos(this.r.startPos)

        this.r.shape = new cp.CircleShape(this.r.body, this.r.radius, cp.v(0, 0))
    },

    initBox2D: function() {
        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef
        fixtureDef.density = 1.0
        fixtureDef.friction = 0.5
        fixtureDef.restitution = 0.2
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape
        fixtureDef.shape.SetAsBox(this.r.radius, this.r.radius)

        var bodyDef = new Box2D.Dynamics.b2BodyDef
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody
        bodyDef.position.Set(this.r.startPos.x, this.r.startPos.y)
        bodyDef.userData = { type: "ball" }

        this.r.body = this.r.space.CreateBody(bodyDef)
        this.r.body.CreateFixture(fixtureDef)
    },

    applyTangentialImpulse: function(i) {
        this.r.body.applyImpulse(
            cp.v(i, 0),
            cp.v(this.getX(), this.getY() + this.r.radius)
        )
    },

    applyTorque: function(f) {
        this.r.body.applyForce(
            cp.v(f, 0),
            cp.v(this.getX(), this.getY() + this.r.radius)
        )
    },

    getAngle: function() {
        return this._super() - this.r.offset
    },

    setAngle: function(rad) {
        var ang = this.r.offset + rad
        this.r.body.setAngle(ang)
    },

    getTop: function() {
        return rss.p.addY(this.r.startPos, this.r.radius)
    },

    getSurfaceVel: function() {
        return this.r.body.w * this.r.radius
    },

    setSurfaceVel: function(v) {
        this.setAngularVel(v / this.r.radius)
    },

    getAngularVel: function() {
        return this.r.body.w
    },

    setAngularVel: function(w) {
        this.r.body.w = w
    },

    drawCircle: function(col) {
        this.getDraw().drawCircle(
            cc.p(),
            this.getRadius(),
            2,
            this.getRadius(),
            false,
            10,
            col
        )
    },

    drawDot: function(col) {
        this.getDraw().drawDot(
            cc.p(),
            this.getRadius(),
            col
        )
    },

    draw: function(col) {
        var col = col || this.getColor() || rss.colors.white
        this.drawDot(col)
        this.drawCircle(col)
        this.r.draw.setPosition(this.getPos())
    }
})

rss.CircBody.create = function(args) {
    return new rss.CircBody(args).init()
}