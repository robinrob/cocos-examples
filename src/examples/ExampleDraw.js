var ExampleDraw = {
    Layer: BaseLayer.extend({
        ctor: function () {
            this._super();

            this.init()
        },

        init: function () {
            this._super()

            var draw = new cc.DrawNode()
            this.addChild(draww)

            var width = 50
            var height = 50
            var pos = rss.center()

            var square = [
                cc.p(+width / 2, pos.y - height / 2),
                cc.p(+width / 2, pos.y + height / 2),
                cc.p(-width / 2, pos.y + height / 2),
                cc.p(-width / 2, pos.y - height / 2)
            ]
            rss.
            draw1.drawPoly(square, this.r.color, 0, this.r.color)


            var pos1 = rss.add(pos, cc.p(-200, 0))
            var square45 = [
                rss.add(pos1, cc.p(width, 0)),
                rss.add(pos1, cc.p(width * 2, width)),
                rss.add(pos1, cc.p(width, width * 2)),
                rss.add(pos1, cc.p(0, width))
            ]
            draw.drawPoly(square45, null, 5, cc.color(255, 255, 0, 255));

            draw.drawPoly(star, this.r.color, 0, this.r.color)
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleDraw.Layer())
        }
    })
}