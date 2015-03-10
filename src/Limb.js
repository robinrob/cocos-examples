var Limb = cc.Node.extend({
    startPos: null,
    startV: null,
    _width: null,
    _height: null,
    mass: null,
    space: null,
    body: null,
    _draw: null,
    _color: null,

    ctor: function(pos, size, mass, space, color) {
        this._super()

        this.startPos = pos
        this.startV = cp.v(pos.x, pos.y)
        this._width = size.width
        this._height = size.height
        this.mass = mass
        this.space = space
        this._color = color

        this.init()
    },

    init: function() {
        this._super()
        // physics
        //var shape = new cp.BoxShape(this.space.staticBody, this._width, this._height)
        //var shape = this.space.addStaticShape(shape)
        //shape.setElasticity(0);

        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this._width, this._height))
        this.space.addBody(this.body)
        this.body.setPos(this.startV)

        var shape = new cp.BoxShape(this.body, this._width, this._height)
        var shape = this.space.addShape(shape)
        shape.setElasticity(0);
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
        return cc.p(pos.x, pos.y + this._height / 2)
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getTopLeftV: function() {
        return rss.toV(this.getTopLeft())
    },

    getJointV: function() {
        var p = this.getPos()
        return cp.v(p.x, p.y + this._height / 2)
    },

    getMass: function() {
        return this.body.m
    }
})