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
            draw.drawPoly(square, rss.colors.green, 1, rss.colors.green)

            pos = cc.p(+200, 200)
            var square45 = rss.squareVerts(width)
            square45 = rss.rotateAll(square45, rss.toRad(45))
            square45 = rss.p.addAll(square45, pos)
            draw.drawPoly(square45, rss.colors.red, 1, rss.colors.red)

            //pos = cc.p(-200, -200)
            //var star4 = rss.starVerts(4, width, width * 0.5, width * 0.2)
            //star4 = rss.p.addAll(star4, pos)
            //draw.drawPoly(star4, rss.colors.yellow, 1, rss.colors.yellow)

            var star = Star.create({pos: rss.center()})
            star.setColor(rss.colors.yellow)
            star.draw()
            this.addChild(star)

            //pos = cc.p()
            //var circSeg = rss.circSegmentVerts(width, 0, 0, 50)
            //circSeg = rss.p.addAll(circSeg, pos)
            //draw.drawPoly(circSeg, rss.colors.yellow, 1, rss.colors.yellow)


        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleDraw.Layer())
        }
    })
}