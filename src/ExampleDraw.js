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
            
            var winSize = cc.director.getWinSize()
            var pos = cc.p(winSize.width, winSize.height)
            
            var width = 50
            var height = 50

            var verts = [
                cc.p(pos.x + width / 2, pos.y - height / 2),
                cc.p(pos.x + width / 2, pos.y + height / 2),
                cc.p(pos.x - width / 2, pos.y + height / 2),
                cc.p(pos.x - width / 2, pos.y - height / 2)
            ]
            draw.drawPoly(verts, this._color, 0, this._color)


            var vertices = [cc.p(150, 100), cc.p(200, 150), cc.p(150, 200), cc.p(100, 150)];
            var vertices = [cc.p(150, 100), cc.p(150, 150), cc.p(100, 150), cc.p(100, 100)];
            draw.drawPoly(vertices, null, 5, cc.color(255, 255, 0, 255));

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