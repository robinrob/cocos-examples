var RectBody = rss.RectBody = DynamicBody.extend({
    ctor: function(pos, size, mass, space) {
        this._super(pos, size, mass, space)

        this.init()
    },

    init: function() {
        this._super()

        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.space.addBody(this.body)
        this.body.setPos(this.getStartPos())

        // shape
        var shape = new cp.BoxShape(this.body, this.size.width, this.size.height)
        this.shape = this.space.addShape(shape)
    }
})