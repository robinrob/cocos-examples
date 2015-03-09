var Limb = cc.Node.extend({
    startPos: null,
    startV: null,
    _width: null,
    _height: null,
    body: null,
    _draw: null,
    _color: null,

    ctor: function(pos, size, mass, space, color) {
        this._super()

        this.startPos = pos
        this.startV = cp.v(pos.x, pos.y)
        this.mass = mass
        this._width = size.width
        this._height = size.height
        this.space = space
        this._color = color

        this.init()
    },

    init: function() {
        this._super()
        // physics
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this._width, this._height))
        this.space.addBody(this.body)
        this.body.setPos(this.startV)

        var shape = new cp.BoxShape(this.body, this._width, this._height)
        var shape = this.space.addShape(shape)
        shape.setElasticity(0);

        this._draw = new cc.DrawNode()
        this.addChild(this._draw)
        this.draw()
    },

    getPos: function() {
        return this.body.getPos()
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

    draw: function() {
        var pos = this.body.getPos()
    },

    move: function() {
        this.draw()
    }
})