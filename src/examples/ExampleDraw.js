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

            var pos = this.center
            
            var width = 50
            var height = 50

            var square = [
                cc.p(pos.x + width / 2, pos.y - height / 2),
                cc.p(pos.x + width / 2, pos.y + height / 2),
                cc.p(pos.x - width / 2, pos.y + height / 2),
                cc.p(pos.x - width / 2, pos.y - height / 2)
            ]
            draw.drawPoly(square, this._color, 0, this._color)


            var pos1 = rss.add(pos, cc.p(-200, 0))
            var square45 = [
                rss.add(pos1, cc.p(width, 0)),
                rss.add(pos1, cc.p(width * 2, width)),
                rss.add(pos1, cc.p(width, width * 2)),
                rss.add(pos1, cc.p(0, width))
            ]
            draw.drawPoly(square45, null, 5, cc.color(255, 255, 0, 255));

            o=180;
            w=20;
            h=50;
            star = [
                cc.p(o,o), cc.p(o+w,o-h), cc.p(o+w*2, o),       // lower spike
                cc.p(o + w*2 + h, o+w ), cc.p(o + w*2, o+w*2),  // right spike
                cc.p(o +w, o+w*2+h), cc.p(o,o+w*2),             // top spike
                cc.p(o -h, o+w)                                 // left spike
            ];
            draw.drawPoly(star, this._color, 0, this._color)
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleDraw.Layer())
        }
    })
}