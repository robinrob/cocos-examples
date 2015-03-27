var CircFlyingObstacle = rss.RectBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.angle = cc.degreesToRadians(args.angle)
        this.r.rotation = cc.degreesToRadians(args.rotation)
        this.r.omega = cc.degreesToRadians(args.omega)
        this.r.tangVel = this.r.omega * this.r.radius
        this.r.radialAcc = this.r.omega * this.r.omega * this.r.radius
    },

    init: function() {
        this._super()

        this.setPos(rss.add(cc.p(600, 600), cc.p(this.r.radius, 0)))
        this.setVel(cc.p(0, 1 * this.r.tangVel))

        return this
    },

    move: function(dt) {
        var x = rss.sub(this.getPos(), cc.p(600, 600)).x
        var y = rss.sub(this.getPos(), cc.p(600, 600)).y
        var theta = Math.atan(Math.abs(y / x))

        var ix = -1 * rss.sign(this.getVel().y) * this.getMass() * this.r.radialAcc * Math.cos(theta) * dt
        var iy = rss.sign(this.getVel().x) * this.getMass() * this.r.radialAcc * Math.sin(theta) * dt
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