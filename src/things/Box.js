rss.Box = rss.CompositeStaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.size = args.size
        this.r.width = args.size.width
        this.r.height = args.size.height
        this.r.thickness = args.thickness
        this.r.walls = args.walls || 4
    },

    init: function() {
        this._super()

        return this
    },

    walls: function() {
        this.constructWalls()
        this.addChildComp(this.r.leftWall)
        this.addChildComp(this.r.rightWall)
        this.addChildComp(this.r.bottomWall)
        if (this.r.walls > 3) {
            this.addChildComp(this.r.topWall)
        }
        return this
    },

    constructWalls: function() {
        cc.log("Box.init ...")

        var left = cp.v(this.r.thickness / 2, this.r.height / 2)
        var right = cp.v(this.r.width - this.r.thickness / 2, this.r.height / 2)
        var sVert = cc.size(this.r.thickness, this.r.height - this.r.thickness * 2)

        var top = cp.v(this.r.width / 2, this.r.height - this.r.thickness / 2)
        var bottom = cp.v(this.r.width / 2, this.r.thickness / 2)
        var sHoriz = cc.size(this.r.width, this.r.thickness)

        this.r.leftWall = new rss.StaticRectBody.create({pos: left, size: sVert})

        this.r.rightWall = new rss.StaticRectBody.create({pos: right, size: sVert})

        this.r.bottomWall = new rss.StaticRectBody.create({pos: bottom, size: sHoriz})

        this.r.topWall = new rss.StaticRectBody.create({pos: top, size: sHoriz})

        this.setElasticity(1.0)
    }
})

rss.Box.create = function(args) {
    args.thickness = args.thickness || 20
    args.walls = 4
    return new rss.Box(args).walls().init()
},

rss.Box.createOpen = function(args) {
    args.thickness = args.thickness || 20
    args.walls = 3
    return new rss.Box(args).walls().init()
}