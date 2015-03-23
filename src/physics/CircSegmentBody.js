rss.CircSegmentBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius, args.radius)
        this._super(args)

        this.radius = args.radius
        this.angle = args.angle
        this.segments = args.segments
        this.rotation = args.rotation - this.angle
        this.length = args.length || 0.5
    },

    init: function() {
        this._super()

        if (this.angle > 0) {
            this.initMe()
        }
        else {
            cc.log("angle should be greater than zero!")
        }

        return this
    },

    initMe: function() {
        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.body.setPos(this.getStartPos())

        // shape
        var pos = this.startPos

        var verts = []

        verts.push(
            this.radius * (1 - this.length) * Math.cos(cc.degreesToRadians(this.rotation + this.angle)),
            this.radius * (1 - this.length) * Math.sin(cc.degreesToRadians(this.rotation + this.angle))
        )

        var gap = this.angle / this.segments
        for (var a = this.angle; a >= 0; a -= gap) {
            verts.push(
                this.radius * Math.cos(cc.degreesToRadians(a + this.rotation)),
                this.radius * Math.sin(cc.degreesToRadians(a + this.rotation))
            )
        }

        verts.push(
            this.radius * (1 - this.length) * Math.cos(cc.degreesToRadians(this.rotation)),
            this.radius * (1 - this.length) * Math.sin(cc.degreesToRadians(this.rotation))
        )

        this.shape = new cp.PolyShape(this.body, verts, cp.v(0, 0))

        this.setJointP(cc.p(
            this.radius * (1 - this.length / 2) * Math.cos(cc.degreesToRadians(this.rotation + this.angle / 2)),
            this.radius * (1 - this.length / 2) * Math.sin(cc.degreesToRadians(this.rotation + this.angle / 2))
        ))
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}