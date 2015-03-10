var Part = cc.Node.extend({
    startPos: null,
    startV: null,
    size: null,
    mass: null,
    space: null,
    body: null,
    _color: null,

    ctor: function(pos, size, mass, space, color) {
        this._super()

        this.startPos = pos
        this.startV = cp.v(pos.x, pos.y)
        this.size = size
        this.mass = mass
        this.space = space
        this._color = color
    },

    init: function() {
        this._super()
    },

    getPos: function() {
        return this.body.getPos()
    },

    setPos: function(x, y) {
        this.body.setPos(cp.v(x, y))
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

    getX: function() {
        return this.body.getPos().x
    },

    getY: function() {
        return this.body.getPos().y
    },

    setPos: function(x, y) {
        this.body.setPos(cp.v(x, y))
    },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.size.height / 2)
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getTopLeftV: function() {
        return rss.toV(this.getTopLeft())
    },

    getJointV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.body.m
    }
})