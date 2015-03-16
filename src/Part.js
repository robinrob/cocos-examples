var Part = StaticPart.extend({
    ctor: function(pos, size, mass, space) {
        this._super(pos, size, space)

        this.startV = cp.v(pos.x, pos.y)

        this.mass = mass
    },

    init: function() {
        this._super()
    },

    getVel: function() {
        return this.body.getVel()
    },

    setVel: function(vx, vy) {
        this.body.setVel(cp.v(vx, vy))
    },

    applyDeltaV: function(dvx, dvy) {
        this.body.applyImpulse(cp.v(dvx, dvy), cp.v(0, 0))
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.body.m
    },

    setAngle: function(deg) {
        this.body.setAngle(cc.degreesToRadians(deg))
    }
})