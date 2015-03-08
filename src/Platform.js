var Platform = cc.Node.extend({
        space: null,
        shape: null,
        _draw: null,
        thickness: null,
        p1: null,
        p2: null,
        v1: null,
        v2: null,

        ctor:function(p1, p2, thickness, space) {
            cc.log("Platform.ctor ...")
            this._super()

            this.space = space

            this.p1 = p1
            this.p2 = p2

            this.v1 = cp.v(this.p1.x, this.p1.y)
            this.v2 = cp.v(this.p2.x, this.p2.y)

            this.thickness = thickness

            this.init()
        },

        init:function() {
            cc.log("Platform.init ...")
            this._super()

            this.shape = new cp.SegmentShape(this.space.staticBody, this.v1, this.v2, this.thickness)
            this.shape.setElasticity(1.0)
            this.space.addStaticShape(this.shape)

            var blue = cc.color(0, 0, 255, 255)

            this._draw = new cc.DrawNode()
            this._draw.drawSegment(this.p1, this.p2, this.thickness, blue)
            this.addChild(this._draw)
        }
})