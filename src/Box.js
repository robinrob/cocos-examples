var Box = cc.Node.extend({
    position: null,
    size: null,
    thickness: null,
    space:null,

    ctor: function(position, size, thickness, space) {
        this._super()

        this.position = position
        this.size = size
        this.thickness = thickness
        this.space = space

        this.init()
    },

    init: function() {
        this._super()

        var p = this.position

        var bL = cp.v(p.x, p.y)
        var tL = cp.v(p.x, p.y + this.size.height)
        var bR = cp.v(p.x + this.size.width, p.y)
        var tR = cp.v(p.x + this.size.width, p.y + this.size.height)

        var shapes = [
            new cp.SegmentShape(this.space.staticBody, bL, tL, this.thickness),
            new cp.SegmentShape(this.space.staticBody, bR, tR, this.thickness),
            new cp.SegmentShape(this.space.staticBody, bL, bR, this.thickness),
            new cp.SegmentShape(this.space.staticBody, tL, tR, this.thickness)
        ]

        var that = this
        shapes.forEach(function(shape) {
            shape.setElasticity(1.0)
            that.space.addStaticShape(shape)
        })
    }
})