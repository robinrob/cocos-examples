var ExamplePhysicsSprite = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.r.space = space

            var winSize = cc.director.getWinSize()
            this.r.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            switch(rss.physics) {
                case rss.chipmunk:
                    this._debugNode = new cc.PhysicsDebugNode(this.r.space);
                    this._debugNode.setVisible(true);
                    // Parallax ratio and offset
                    this.addChild(this._debugNode, 10);
                    break;
            }
        },

        init: function () {
            this._super()

            this.fish = new Fish({pos: this.r.center, size: cc.size(), mass: 10}).addToSpace(this.r.space)
            this.addChild(this.fish)
        },

        update: function() {
            this.fish.update()
        }
    }),

    Scene: BaseScene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            switch(rss.physics) {
                case rss.chipmunk:
                    this.r.space = new cp.Space();
                    this.r.space.gravity = cp.v(0, rss.gravity);
                    break;
                case rss.box2D:
                    this.r.space = new Box2D.Dynamics.b2World(rss.gravity, true);
                    this.r.space.gravity = rss.gravity
                    break;
            }

            this.r.layer = new ExamplePhysicsSprite.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            switch(rss.physics) {
                case rss.chipmunk:
                    this.r.space.step(dt);
                    break;
                case rss.box2D:
                    this.r.space.Step(dt, 8, 3)
                    break;
            }

            this.r.layer.update();
        }
    })
}