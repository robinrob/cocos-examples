rss.RectBody = rss._DynamicBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()

        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.body.setPos(this.getStartPos())

        // shape
        this.shape = new cp.BoxShape(this.body, this.size.width, this.size.height)

        return this
    }
})

rss.RectBody.create = function(args) {
    return new rss.RectBody(args).init()
}