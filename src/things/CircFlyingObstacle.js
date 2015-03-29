var CircFlyingObstacle = rss.RectBody.extend({
    ctor: function(args) {
        this._super(args)

        // Radius of circular movement
        this.r.radius = args.radius
        // Range (deg) of circular movement
        this.r.range = args.range
        // Angular velocity
        this.r.omega = args.omega
        // Starting angle (deg) of circular movement
        this.r.offset = args.offset || 0
    },

    init: function() {
        this._super()

        var startAng = this.getOffset() + this.getRange() / 2
        var pos = rss.add(this.getOrigin(), rss.polarToCartesian(this.getRadius(), startAng))

        this.setPos(pos)
        this.setAngle(startAng)

        this.initVel()

        return this
    },

    initVel: function() {
        // Velocity is at 90 degrees to position
        this.setVel(rss.mult(rss.unitVec(this.getVel), Math.abs(this.r.omega) * this.r.radius))
        var dir = rss.unitVec(rss.rotate90(this.getPosRel()))
        this.setVel(cc.p(
            this.r.omega * this.r.radius * dir.x,
            this.r.omega * this.r.radius * dir.y
        ))
    },

    restoreVel: function() {
        this.setVel(rss.mult(rss.unitVec(this.getVel()), Math.abs(this.r.omega) * this.r.radius))
    },

    hasReachedArcLimit: function() {
        cc.log("theta: " + rss.toDeg(this.getAngle()))
        cc.log("theta % 2PI: " + rss.toDeg(this.getAngle() % rss.PI2))
        cc.log("offset: " + rss.toDeg(this.getOffset()))
        cc.log("range: " + rss.toDeg(this.getRange()))
        cc.log("offset + range: " + rss.toDeg(this.getOffset() + this.getRange()))
        return ((this.r.omega > 0) && (this.getAngle() % rss.PI2) >= this.getOffset() + this.getRange())
            || ((this.r.omega < 0) && (this.getAngle() % rss.PI2) <= this.getOffset())
    },

    move: function(dt) {
        if (this.hasReachedArcLimit()) {
            cc.log("reversing")
            this.r.omega *= -1
            this.setVel(rss.rotate180(this.getVel()))
        }

        var rel = this.getPosRel()
        var theta = Math.atan(Math.abs(rel.y / rel.x))

        var radialAcc = this.r.omega * this.r.omega * this.r.radius
        var acc = rss.polarToCartesian(radialAcc, theta)

        // Acceleration vector direction is at 90 degrees to velocity vector
        var dir = rss.unitVec(rss.rotate90(this.getVel()))

        var ix = dir.x * this.getMass() * acc.x * dt
        var iy = dir.y * this.getMass() * acc.y * dt

        var impulse = cc.p(ix, iy)

        this.applyImpulse(impulse)
    },

    getRange: function() {
        return this.r.range
    },

    getPosRel: function() {
        return rss.sub(this.getPos(), this.getOrigin())
    },

    update: function(dt) {
        if (this.getAngle() > this.getOffset() && this.getAngle() < (this.getOffset() + 0.1)) {
            cc.log("Restoring")
            this.restoreVel()
        }
    }
})

CircFlyingObstacle.create = function(args) {
    return new CircFlyingObstacle(args).init()
}