var Platform = rss._StaticBody.extend({
        ctor:function(args) {
            cc.log("Platform.ctor ...")
            args.size = cc.size()
            this._super(args)

            this.p1 = args.p1
            this.p2 = args.p2

            this.thickness = args.thickness
        },

        init:function() {
            cc.log("Platform.init ...")
            this._super()

            this.body = new cp.StaticBody()
            this.shape = new cp.SegmentShape(this.body, this.p1, this.p2, this.thickness)
            this.shape.setElasticity(1.0)

            var blue = cc.color(0, 0, 255, 255)
            this._draw = new cc.DrawNode()
            this._draw.drawSegment(this.p1, this.p2, this.thickness, blue)
            this.addChild(this._draw)

            return this
        }
})

Platform.create = function(args) {
    return new Platform(args).init()
}