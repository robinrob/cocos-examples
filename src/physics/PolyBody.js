rss.PolyBody = rss._DynamicBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.verts = args.verts
    },

    init: function() {
        this._super()

        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.shape = new cp.PolyShape(this.r.body, this.r.verts, cp.v(0, 0))

        return this
    }
})

rss.PolyBody.create = function(args) {
    return new rss.PolyBody(args).init()
}