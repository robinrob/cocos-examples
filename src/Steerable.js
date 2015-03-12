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

    setAngle: function(angle) {
        this.body.setAngle(angle)
    },

    update: function (dt) {
        var p = this.body.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dvx = 0.0
        var dvy = 0.0

        var impulse = this.mass * rss.spaceship.acc * dt
        var ax = impulse * this.body.rot.x * dt
        var ay = impulse * this.body.rot.y * dt

        var thrust = 50

        if ((rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]) && y <= winSize.height) {
            var sign = +1
            this.applyImpulse(sign * thrust * ax, sign * thrust * ay)
        }
        if ((rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]) && y >= 0) {
            var sign = -1
            this.applyImpulse(sign * thrust * ax, sign * thrust * ay)
        }
        if ((rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]) && x >= 0) {
            this.applyImpulseAt(-1 * impulse, 0, 0, this._height / 2)
            this.applyImpulseAt(+1 * impulse, 0, 0, -1 * this._height / 2)
        }
        if ((rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]) && x <= winSize.width) {
            this.applyImpulseAt(+1 * impulse, 0, 0, this._height / 2)
            this.applyImpulseAt(-1 * impulse, 0, 0, -1 * this._height / 2)
        }
    }
})