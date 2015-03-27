var Spring = rss.RectBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.length = args.length
        this.r.mass = args.mass
        this.r.k = 10
    },

    init: function() {
        this._super()

        this.setPos(this.getStartPos())

        return this
    },

    getX: function() {
        var mid = rss.addY(cc.p(600, 400), this.r.length / 2)
        rss.logP(this.r.startPos, "startPos")
        rss.logP(mid, "mid")
        return this.getPos().y - mid.y
    },

    move: function(dt) {
        cc.log("x: " + this.getX())
        rss.logP(this.getPos(), "pos")
        var impulse = cc.p(0, - this.r.k * this.getX() * dt)
        this.applyImpulse(impulse)
    },

    update: function(dt) {
        this.move(dt)
    }
})

Spring.create = function(args) {
    return new Spring(args).init()
}