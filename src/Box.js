var Box = cc.Node.extend({
    ctor: function(position, size, thickness, space) {
        this._super()

        this.position = position
        this.size = size
        this.width = size.width
        this.height = size.height
        this.thickness = thickness
        this.space = space

        this.init()
    },

    init: function() {
        this._super()

        var left = cp.v(this.thickness / 2, this.height / 2)
        var right = cp.v(this.width - this.thickness / 2, this.height / 2)
        var sVert = cc.size(this.thickness, this.height - this.thickness * 2)

        var top = cp.v(this.width / 2, this.height - this.thickness / 2)
        var bottom = cp.v(this.width / 2, this.thickness / 2)
        var sHoriz = cc.size(this.width, this.thickness)

        new rss.StaticRectBody(left, sVert, this.space)
        new rss.StaticRectBody(right, sVert, this.space)
        new rss.StaticRectBody(bottom, sHoriz, this.space)
        new rss.StaticRectBody(top, sHoriz, this.space)
    }
})

Box.create = function(pos, size, space) {
    return new Box(pos, size, 50, space)
}