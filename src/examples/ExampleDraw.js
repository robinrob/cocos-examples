var ExampleDraw = {
    Layer: BaseLayer.extend({
        ctor: function () {
            this._super();

            this.init()
        },

        init: function () {
            this._super()

            var draw = new cc.DrawNode()
            draw.setPosition(rss.center())
            this.addChild(draw)

            var width = 100
            var pos = cc.p(-200, 200)
            var square = rss.squareVerts(width)
            square = rss.p.addAll(square, pos)
            draw.drawPoly(square, rss.colors.green, 5, rss.colors.blue)

            pos = cc.p(+200, 200)
            var square45 = rss.squareVerts(width)
            square45 = rss.rotateAll(square45, rss.toRad(45))
            square45 = rss.p.addAll(square45, pos)
            draw.drawPoly(square45, rss.colors.maroon, 5, rss.colors.red)

            pos = cc.p(-200, -200)
            var star4 = rss.starVerts(5, width, width * 0.5, width * 0.2)
            star4 = rss.p.addAll(star4, pos)
            draw.drawPoly(star4, rss.colors.yellow, 5, rss.colors.red)

            pos = cc.p(+200, -200)
            var circSeg = rss.circSegmentVerts(width, rss.toRad(45), 0, 50)
            circSeg = rss.p.addAll(circSeg, pos)
            draw.drawPoly(circSeg, rss.colors.purple, 5, rss.colors.yellow)
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleDraw.Layer())
        }
    })
}