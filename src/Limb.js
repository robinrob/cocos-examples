var Limb = cc.Node.extend({
    startPos: null,
    startV: null,
    _width: null,
    _height: null,
    body: null,
    shape: null,
    _draw: null,
    _color: null,

    ctor: function(x, y, mass, width, height, space, color, draw) {
        this._super()

        this.startPos = cc.p(x, y)
        this.startV = cp.v(x, y)
        this.mass = mass
        this._width = width
        this._height = height
        this.space = space
        this._color = color
        this._draw = draw

        this.init()
    },

    init: function() {
        this._super()
        // physics
        this.body = this.space.addBody(new cp.Body(this.mass, 1.0, cp.momentForBox(1, 30, 30)))
        this.body.setPos(this.startV)

        var shape = this.space.addShape(new cp.BoxShape(this.body, this._width, this._height))
        shape.setElasticity(0);

        this.draw()
    },

    getPos: function() {
        return this.body.getPos()
    },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this._height)
    },

    draw: function() {
        var pos = this.startPos

        this._draw.clear()
        this._draw.drawRect(pos, cc.p(pos.x + this._width, pos.y + this._height), this._color, 2, this._color)
    },

    move: function() {
        this.draw()
    }
})