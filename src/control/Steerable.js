var Steerable = cc.Node.extend({
    ctor: function(mass) {
        this._super()

        this.r.mass = mass
    },

    init: function() {
        this._super()
    },

    applyForce: function (fx, fy, rx, ry) {
        this.r.body.applyForce(cp.v(fx, fy), cp.v(rx, ry))
    },

    applyImpulse: function (ix, iy) {
        this.r.body.applyImpulse(cp.v(ix, iy), cp.v(0, 0))
    },

    applyImpulseAt: function (ix, iy, rx, ry) {
        this.r.body.applyImpulse(cp.v(ix, iy), cp.v(rx, ry))
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.r.body.rot.x, impulse * this.r.body.rot.y)
    },

    getAngle: function() {
        return -1 * cc.radiansToDegrees(this.r.body.a) % 360
    },

    setAngle: function(angle) {
        this.r.body.setAngle(-1 * cc.degreesToRadians(angle))
    },

    upInput: function() {
        return rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]
    },

    downInput: function() {
        return rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]
    },

    rightInput: function() {
        return rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]
    },

    leftInput: function() {
        return rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]
    },

    horizontalInput: function() {
        return this.r.rightInput() || this.r.leftInput()
    },

    input: function() {
        return this.upInput() || this.downInput() || this.r.rightInput() || this.r.leftInput()
    }
})