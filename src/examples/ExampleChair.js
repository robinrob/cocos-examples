var ExampleChair = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.r.space = space

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);

            this.init()
        },

        init: function () {
            this._super()

            rss.Box.create({pos: rss.center(), size: rss.winsize()}).addToSpace(this.r.space)

            Chair.create({pos: rss.p.addY(rss.center(), rss.chair.height.total)}).addToSpace(this.r.space)

            this.addChild(Platform.create({
                p1: rss.p.addX(rss.center(), -50),
                p2: rss.p.addX(rss.center(), 10),
                thickness: 10
            }).addToSpace(this.r.space))
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExampleChair.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update();
        }
    })
}