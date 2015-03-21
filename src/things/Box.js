rss.Box = rss._CompositeStaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.size = args.size
        this.width = args.size.width
        this.height = args.size.height
        this.thickness = args.thickness
        this.space = args.space
    },

    init: function() {
        this._super()
        this.constructWalls()

        this.addComp(this.left)
        this.addComp(this.right)
        this.addComp(this.bottom)
        this.addComp(this.top)
        return this
    },

    with3Walls: function() {
        this.comps = []
        this.addComp(this.left)
        this.addComp(this.right)
        this.addComp(this.bottom)
        return this
    },

    constructWalls: function() {
        cc.log("Box.init ...")

        this.walls = []

        var left = cp.v(this.thickness / 2, this.height / 2)
        var right = cp.v(this.width - this.thickness / 2, this.height / 2)
        var sVert = cc.size(this.thickness, this.height - this.thickness * 2)

        var top = cp.v(this.width / 2, this.height - this.thickness / 2)
        var bottom = cp.v(this.width / 2, this.thickness / 2)
        var sHoriz = cc.size(this.width, this.thickness)

        this.left = new rss.StaticRectBody.create({pos: left, size: sVert, space: this.space})
        this.left.shape.setElasticity(1.0)

        this.right = new rss.StaticRectBody.create({pos: right, size: sVert, space: this.space})
        this.right.shape.setElasticity(1.0)

        this.bottom = new rss.StaticRectBody.create({pos: bottom, size: sHoriz, space: this.space})
        this.bottom.shape.setElasticity(1.0)

        this.top = new rss.StaticRectBody.create({pos: top, size: sHoriz, space: this.space})
        this.top.shape.setElasticity(1.0)
    }
})

rss.Box.create = function(args) {
    args.thickness = 20
    return new rss.Box(args).init()
},

rss.Box.createOpen = function(args) {
    args.thickness = 20
    return new rss.Box(args).init().with3Walls()
}