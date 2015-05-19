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

        return this
    },

    draw: function(col) {
        this.r.draw.clear()

        var col = col || this.getColor() || rss.colors.white
        this.r.draw.drawRect(
            cc.p(-this.getWidth() / 2, -this.getHeight() / 2),
            cc.p(this.getWidth() / 2, this.getHeight() / 2),
            rss.setAlpha(col, 255),
            2,
            rss.setAlpha(col, 255)
        )
        this.r.draw.setPosition(this.getPos())
        this.r.draw.setAnchorPoint(0.5, 0.5)
        this.r.draw.setRotation(-1 * rss.toDeg(this.getAngle()))
    }
})

rss.RectBody.create = function(args) {
    return new rss.RectBody(args).init()
}