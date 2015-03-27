var CircFlyingObstacle = rss.RectBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.angle = cc.degreesToRadians(args.angle)
        this.r.rotation = cc.degreesToRadians(args.rotation)
        this.r.omega = cc.degreesToRadians(args.omega)
        this.r.mass = 10
    },

    init: function() {
        this._super()

        this.r.theta = 0
        this.setTheta(0)

        return this
    },

    setTheta: function (angle) {
        this.r.theta = angle
        this.setAngle(this.r.rotation + this.r.theta - this.r.angle / 2)
    },

    incTheta: function(da) {
        this.setTheta(this.r.theta + da)
    },

    setAngle: function(angle) {
        this.r.body.a = angle
        this.setPos(cc.p(
            this.getStartPos().x + this.r.radius * Math.cos(angle),
            this.getStartPos().y + this.r.radius * Math.sin(angle)
        ))
    },

    move: function(dt) {
        if (Math.abs(this.r.theta) > this.r.angle / 2) {
            cc.log("rotation: " + this.r.rotation)
            cc.log("angle: " + this.r.angle)
            cc.log("theta: " + this.r.theta)
            this.r.omega *= -1
        }

        this.incTheta(this.r.omega * dt)
    },

    update: function(dt) {
        this.move(dt)
    }
})

CircFlyingObstacle.create = function(args) {
    return new CircFlyingObstacle(args).init()
}