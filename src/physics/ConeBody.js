rss.ConeBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.length, args.length)
        this._super(args)

        this.length = args.length
        this.radius = args.radius
        this.angle = cc.radiansToDegrees(2 * this.radius / this.length)
        this.segments = args.segments
        this.rotation = args.rotation - this.angle / 2
    },

    init: function() {
        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.body.setPos(this.getStartPos())

        // shape
        var verts = []

        verts.push(0, 0)

        var gap = this.angle / this.segments
        for (var a = 90; a >= -90; a -= gap) {
            verts.push(
                this.length * Math.cos(cc.degreesToRadians(this.rotation)) + this.radius * Math.cos(cc.degreesToRadians(a + this.rotation)),
                this.length * Math.sin(cc.degreesToRadians(this.rotation)) + this.radius * Math.sin(cc.degreesToRadians(a + this.rotation))
            )
        }

        this.shape = new cp.PolyShape(this.body, verts, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        return this
    }
})

rss.ConeBody.create = function(args) {
    return new rss.ConeBody(args).init()
}