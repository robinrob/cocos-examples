var Star = rss.CircBody.extend({
    ctor: function(args) {
        args.radius = rss.star.width / 2
        args.mass = rss.star.mass
        args.size = cc.size(rss.star.width, rss.star.width)

        this._super(args)

        this.r.shouldDraw = true
    },

    init: function() {
        this._super()

        this.setCollisionType(rss.tag.star)
        this.setSensor(true)

        return this
    },

    attachToWorld: function(world) {
        this.r.constraints = rss.fixedJoint(this, world, world.START_ANGLE)
    },

    getConstraints: function() {
        return this.r.constraints
    },

    draw: function() {
        this.r.draw.clear()
        this.r.draw.setPosition(this.getPos())
        this.r.draw.setRotation(90)
        this.r.draw.drawPoly(
            rss.starVerts(5, this.r.radius, this.r.radius * 0.5, this.r.radius * 0.2),
            rss.setAlpha(this.getColor(), 128),
            rss.ui.linewidth,
            rss.setAlpha(this.getColor(), 255)
        )
    },

    update: function() {
        if (this.r.shouldDraw) {
            this.draw()
        }
    }
})

Star.create = function(args) {
    return new Star(args).init()
}