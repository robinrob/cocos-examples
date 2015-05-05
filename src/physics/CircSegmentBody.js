rss.CircSegmentBody = rss._DynamicBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.segments = args.segments
        this.r.offset = args.offset - this.getWidth()
        this.r.size.height = this.r.size.height || 1.0

        this.r.midPoint = this.r.offset + this.getWidth() / 2
        this.r.right = this.r.offset + this.getWidth()
        this.r.left = this.r.offset
    },

    init: function() {
        this._super()

        if (this.getWidth() > 0) {
            this.initMe()
        }
        else {
            cc.log("angle should be greater than zero!")
        }

        return this
    },

    initMe: function() {
        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.vertsXY = []
        this.r.verts = []

        var p = rss.polarToCartesian(this.r.radius * (1 - this.getHeight()), this.r.right)
        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        var gap = this.getWidth() / this.r.segments
        for (var a = this.getWidth(); a >= 0; a -= gap) {
            p = cc.p(
                this.r.radius * Math.cos(a + this.r.offset),
                this.r.radius * Math.sin(a + this.r.offset)
            )
            this.r.vertsXY.push(p.x, p.y)
            this.r.verts.push(p)
        }

        p = rss.polarToCartesian(this.r.radius * (1 - this.getHeight()), this.r.left)

        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        this.r.shape = new cp.PolyShape(this.r.body, this.r.vertsXY, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        this.anchorX = this.getStartPos().x
        this.anchorY = this.getStartPos().y

        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)
    },

    getTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius, this.getWidth() / 2 + this.r.midPoint)
        }
    },

    getShapeTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius * this.getHeight(), this.r.midPoint)
        }
    },

    getShapeBottom: function(wantGlobal) {
        if (wantGlobal) {
            return rss.sub(this.getShapeTop(true), this.getShapeTop(false))
        }
        else {
            return cc.p(0, 0)
        }
    },

    getVerts: function(wantGlobal) {
        if (wantGlobal) {
            return rss.offsetVerts(this.r.verts, this.r.startPos)
        }
        else {
            return this.r.verts
        }
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}