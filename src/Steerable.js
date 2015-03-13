var Steerable = cc.Node.extend({
    body: null,
    mass: null,
    _height: null,

    ctor: function(mass) {
        this._super()

        this.mass = mass
    },

    init: function() {
        this._super()
    },

    applyForce: function (fx, fy, rx, ry) {
        this.body.applyForce(cp.v(fx, fy), cp.v(rx, ry))
    },

    applyImpulse: function (ix, iy) {
        this.body.applyImpulse(cp.v(ix, iy), cp.v(0, 0))
    },

    applyImpulseAt: function (ix, iy, rx, ry) {
        this.body.applyImpulse(cp.v(ix, iy), cp.v(rx, ry))
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.body.rot.x, impulse * this.body.rot.y)
    },

    getAngle: function() {
        return -1 * cc.radiansToDegrees(this.body.a) % 360
    },

    setAngle: function(angle) {
        this.body.setAngle(-1 * cc.degreesToRadians(angle))
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
        return this.rightInput() || this.leftInput()
    },

    input: function() {
        return this.upInput() || this.downInput() || this.rightInput() || this.leftInput()
    }
})