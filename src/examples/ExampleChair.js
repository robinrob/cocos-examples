var ExampleChair = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.r.space = space

            var winSize = cc.director.getWinSize()
            this.r.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            rss.Box.create({pos: this.r.center, size: this.r.size}).addToSpace(this.r.space)

            Chair.create({pos: this.r.center}).addToSpace(this.r.space)

            this.addChild(Platform.create({
                p1: rss.addX(this.r.center, -100),
                p2: rss.addX(this.r.center, 40),
                thickness: 10
            }).addToSpace(this.r.space))
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

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