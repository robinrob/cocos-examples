var ExamplePolyBody = {
    Layer: BaseLayer.extend({
        ctor: function(space) {
            this._super();
            this.r.space = space

            rss.Box.create({pos: cc.p(), size: this.r.size}).addToSpace(this.r.space)
            this.debugNodeChipmunk()

            this.init()
        },

        debugNodeChipmunk: function() {
            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            //o=180;
            //w=20;
            //h=50;
            //star = [o, o, o+w, o-h, o+w*2, o, o+w*2+h, o+w, o+w*2, o+w*2, o+w, o+w*2+h, o, o+w*2, o-h, o+w]
            //    //cc.p(o,o), cc.p(o+w,o-h), cc.p(o+w*2, o),       // lower spike
            //    //cc.p(o + w*2 + h, o+w ), cc.p(o + w*2, o+w*2),  // right spike
            //    //cc.p(o +w, o+w*2+h), cc.p(o,o+w*2),             // top spike
            //    //cc.p(o -h, o+w)                                 // left spike
            //
            //var draw = new cc.DrawNode()
            //draw.setPosition(rss.center())
            //draw.drawPoly(star, rss.colors.red, 2, rss.colors.red)
            //rss.PolyBody.create({
            //    pos: rss.subX(rss.center(), 300),
            //    verts: star,
            //    size: cc.size(50, 50),
            //    mass: 10
            //}).addToSpace(this.r.space)

            o=0;
            w=20;
            h=50;
            var width = 2 * h + w
            var radius = width / 2
            var star = [
                cc.p(0, 0), cc.p(w, -1 * h), //bottom
                cc.p(w*2, 0), cc.p(w*2 + h, w), //right
                cc.p(w*2, w*2),  cc.p(w, w*2+h), //top
                cc.p(0,w*2), cc.p(-1 * h, w) //left
            ];
            var draw = new cc.DrawNode()
            draw.setPosition(rss.center())
            draw.drawPoly(star, rss.colors.red, 2, rss.colors.red)
            this.addChild(draw)
        }
    }),

    Scene: BaseScene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExamplePolyBody.Layer(this.r.space);

            this.addChild(this.r.layer);

            //this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);
        }
    })
}