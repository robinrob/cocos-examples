rss.RectBody = rss.DynamicBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()

        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.shape = new cp.BoxShape(this.r.body, this.r.size.width, this.r.size.height)

        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)

        return this
    },

    erase: function() {
        this.r.draw.clear()
    },

    draw: function() {
        this.r.draw.drawRect(
            rss.p.sub(this.getPos(), cc.p(this.getWidth() / 2, this.getHeight() / 2)),
            rss.p.add(this.getPos(), cc.p(this.getWidth() / 2, this.getHeight() / 2)),
            rss.setAlpha(this.getColor(), 255),
            rss.ui.linewidth,
            rss.setAlpha(this.getColor(), 255)
        )
    }
})

rss.RectBody.create = function(args) {
    return new rss.RectBody(args).init()
}