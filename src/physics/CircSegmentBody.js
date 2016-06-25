rss.CircSegmentBody = rss.DynamicBody.extend({
    SCALE: 1.0,

    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.segments = args.segments
        this.r.offset = args.offset - this.getWidth()
        this.r.size.height = this.r.size.height || 1.0

        this.r.midPoint = this.r.offset + this.getWidth() / 2
        this.r.right = this.r.offset + this.getWidth()
        this.r.left = this.r.offset

        this.r.startAngle = args.startAngle

        this.r.shouldPersist = false
        this.r.shouldDraw = true
    },

    init: function() {
        this._super()
        this.r.isInSpace = true

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
        this.r.verts = rss.floatingCircSegmentVerts(this.r.radius, this.getWidth(), this.r.offset, this.r.segments, this.r.size.height)
        this.r.verts = rss.scaleVerts(this.r.verts, this.SCALE)

        this.r.vertsXY = rss.toXYVerts(this.r.verts)

        this.r.shape = new cp.PolyShape(this.r.body, this.r.vertsXY, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        this.anchorX = this.getStartPos().x
        this.anchorY = this.getStartPos().y

        this.startAng = this.r.body.a
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
            return rss.p.sub(this.getShapeTop(true), this.getShapeTop(false))
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
    },

    getStartAngle: function() {
        return this.r.startAngle
    },

    setShouldPersist: function(bool) {
        this.r.shouldPersist = bool
    },

    getShouldPersist: function() {
        return this.r.shouldPersist
    },

    isInView: function() {
        var ang = (this.getAngle() + rss.checkpointAngles[rss.checkpointReached]) % rss.twoPI
        var rightEdgeAng = rss.toDeg((this.getStartAngle() - (ang + this.getWidth() / 2)))
        var leftEdgeAng = rss.toDeg((this.getStartAngle() - (ang - this.getWidth() / 2)))
        var limit = 20
        return (rightEdgeAng < limit) && (leftEdgeAng > (-1 * limit))
    },

    draw: function(drawNode) {
        if (rss.config.draw) {
            drawNode.drawPoly(
                this.getVerts(false).reverse(),
                rss.setAlpha(this.getColor(), 128),
                rss.ui.linewidth / 2.0,
                rss.setAlpha(this.getColor(), 255)
            )
            //drawNode.setPosition(this.getPos())
            //drawNode.setAnchorPoint(0.5, 0)
            //drawNode.setRotation(-1 * rss.toDeg(this.getAngle()))
        }
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}