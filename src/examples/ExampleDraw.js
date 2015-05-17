var ExampleDraw = {
    Layer: BaseLayer.extend({
        ctor: function () {
            this._super();

            this.init()
        },

        init: function () {
            this._super()

            var draw = new cc.DrawNode()
            this.addChild(draw)

            var width = 50
            var height = 50
            var pos = rss.center()

            var square = [
                cc.p(+width / 2, pos.y - height / 2),
                cc.p(+width / 2, pos.y + height / 2),
                cc.p(-width / 2, pos.y + height / 2),
                cc.p(-width / 2, pos.y - height / 2)
            ]
            square = rss.p.addAll(square, pos)
            draw.drawPoly(square, this.r.color, 0, this.r.color)


            var pos1 = rss.p.add(pos, cc.p(-200, 0))
            var square45 = [
                rss.p.add(pos1, cc.p(width, 0)),
                rss.p.add(pos1, cc.p(width * 2, width)),
                rss.p.add(pos1, cc.p(width, width * 2)),
                rss.p.add(pos1, cc.p(0, width))
            ]
            draw.drawPoly(square45, null, 5, cc.color(255, 255, 0, 255));
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleDraw.Layer())
        }
    })
}