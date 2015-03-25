rss.CircSegmentBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius, args.radius)
        this._super(args)

        this.r.radius = args.radius
        this.r.angle = args.angle
        this.r.segments = args.segments
        this.r.rotation = args.rotation - this.r.angle
        this.r.length = args.length || 1.0
    },

    init: function() {
        this._super()

        if (this.r.angle > 0) {
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

        var p = cc.p(
            this.r.radius * (1 - this.r.length) * Math.cos(cc.degreesToRadians(this.r.rotation + this.r.angle)),
            this.r.radius * (1 - this.r.length) * Math.sin(cc.degreesToRadians(this.r.rotation + this.r.angle))
        )
        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        var gap = this.r.angle / this.r.segments
        for (var a = this.r.angle; a >= 0; a -= gap) {
            p = cc.p(
                this.r.radius * Math.cos(cc.degreesToRadians(a + this.r.rotation)),
                this.r.radius * Math.sin(cc.degreesToRadians(a + this.r.rotation))
            )
            this.r.vertsXY.push(p.x, p.y)
            this.r.verts.push(p)
        }

        p = cc.p(
            this.r.radius * (1 - this.r.length) * Math.cos(cc.degreesToRadians(this.r.rotation)),
            this.r.radius * (1 - this.r.length) * Math.sin(cc.degreesToRadians(this.r.rotation))
        )
        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        this.r.shape = new cp.PolyShape(this.r.body, this.r.vertsXY, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))
    },

    getTop: function(wantGlobal) {
        if (wantGlobal) {
            return cc.p(
                this.r.startPos.x + this.r.radius * Math.cos(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation)),
                this.r.startPos.y + this.r.radius * Math.sin(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation))
            )
        }
        else {
            return cc.p(
                this.r.radius * Math.cos(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation)),
                this.r.radius * Math.sin(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation))
            )
        }
    },

    getShapeTop: function(wantGlobal) {
        if (wantGlobal) {
            return cc.p(
                this.r.startPos.x + this.r.radius * Math.cos(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation)),
                this.r.startPos.y + this.r.radius * Math.sin(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation))
            )
        }
        else {
            return cc.p(
                this.r.radius * this.r.length * Math.cos(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation)),
                this.r.radius * this.r.length * Math.sin(cc.degreesToRadians(this.r.angle / 2 + this.r.rotation))
            )
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
    },

    draw: function() {
        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)

        var wank = this.getVerts(true).reverse()
        //cc.log("Processed:")
        wank.forEach(function(v){
            rss.logP(v)
        })
        this.r.draw.drawPoly(wank, rss.colors.blue, 0, rss.colors.blue)

        return this
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}