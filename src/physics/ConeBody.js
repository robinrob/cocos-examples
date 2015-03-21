rss.ConeBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius * 2, args.radius + args.coneLength)
        this._super(args)

        this.radius = args.radius
        this.coneLength = args.coneLength
        this.segments = args.segments
    },

    init: function() {
        this._super()

        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.body.setPos(this.getStartPos())

        // shape
        var pos = this.startPos

        var verts = []

        var p = cc.p(pos.x, pos.y - this.coneLength)

        for (var a = 0; a < 180; a += 180 / this.segments) {
            var x = pos.x + (this.radius * Math.cos(cc.degreesToRadians(a + 180)))
            verts.push(x)
            var y = pos.y + this.radius * Math.sin(cc.degreesToRadians(a))
            verts.push(y)
        }

        verts.push(p.x, p.y)

        for (var i = 0; i < verts.length; i += 2) {
            cc.log("x: " + verts[i])
            cc.log("y: " + verts[i+1])
        }

        //this.shape = new cp.PolyShape(this.body, verts, cp.v(0, 0))
        this.shape = new cp.PolyShape(this.body, verts, cp.v(0, 0))

        return this
    }
})

rss.ConeBody.create = function(args) {
    return new rss.ConeBody(args).init()
}