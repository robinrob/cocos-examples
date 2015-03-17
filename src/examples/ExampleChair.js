var ExampleChair = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.space = space

            var winSize = cc.director.getWinSize()
            this.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            Box.create(cc.p(this.MARGIN, 0), this.size, this.space)

            this.constructChair()

            this.addChild(new Platform(rss.addX(this.center, -40), rss.addX(this.center, 40), 10, this.space))
        },

        constructChair: function() {
            this.chair = new Chair(this.center, this.space)
            this.addChild(this.chair)
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExampleChair.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update();
        }
    })
}