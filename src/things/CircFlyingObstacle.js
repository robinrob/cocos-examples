var CircFlyingObstacle = rss.RectBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.angle = args.angle
        this.r.rotation = args.rotation
        this.r.omega = args.omega
        this.r.tangVel = this.r.omega * this.r.radius
    },

    init: function() {
        this._super()

        this.setPos(rss.add(this.r.startPos, cc.p(this.r.radius, 0)))
        this.setVel(cc.p(0, 1 * this.r.tangVel))

        return this
    },

    hasReachedArcLimit: function() {
        return ((this.r.omega > 0) && ((this.getAngle() - this.rotation % rss.PI2) > this.r.angle / 2))
            || ((this.r.omega < 0) && ((this.getAngle() % rss.PI2) < -1 * this.r.angle / 2))
    },

    move: function(dt) {
        var x = rss.sub(this.getPos(), this.getStartPos()).x
        var y = rss.sub(this.getPos(), this.getStartPos()).y

        var theta = Math.atan(Math.abs(y / x))
        rss.logDeg(theta, "theta")
        rss.logDeg(this.r.angle, "angle")
        cc.log("body angle: " + this.getAngleDeg() % 360)

        if (this.hasReachedArcLimit()) {
            cc.log("reversing")
            this.r.omega *= -1
            this.setVel(rss.rotate180(this.getVel()))
        }

        var radialAcc = this.r.omega * this.r.omega * this.r.radius

        var ix = -1 * rss.sign(this.getVel().y) * this.getMass() * radialAcc * Math.cos(theta) * dt
        var iy = rss.sign(this.getVel().x) * this.getMass() * radialAcc * Math.sin(theta) * dt
        var impulse = cc.p(ix, iy)

        this.applyImpulse(impulse)
    },

    update: function(dt) {
        this.move(dt)
    }
})

CircFlyingObstacle.create = function(args) {
    return new CircFlyingObstacle(args).init()
}