var ExamplePhysicsSprite = {
    Layer: BaseLayer.extend({
        space: null,

        ctor: function (space) {
            this._super();
            this.space = space

            var winSize = cc.director.getWinSize()
            this.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            switch(rss.physics) {
                case rss.chipmunk:
                    this._debugNode = new cc.PhysicsDebugNode(this.space);
                    this._debugNode.setVisible(true);
                    // Parallax ratio and offset
                    this.addChild(this._debugNode, 10);
                    break;
            }
        },

        init: function () {
            this._super()

            this.fish = new Fish(this.center, cc.size(), 10, this.space)
            this.addChild(this.fish)
        },

        update: function() {
            this.fish.update()
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            switch(rss.physics) {
                case rss.chipmunk:
                    this.space = new cp.Space();
                    this.space.gravity = cp.v(0, rss.gravity);
                    break;
                case rss.box2D:
                    this.space = new Box2D.Dynamics.b2World(rss.gravity, true);
                    this.space.gravity = rss.gravity
                    break;
            }

            this.layer = new ExamplePhysicsSprite.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            switch(rss.physics) {
                case rss.chipmunk:
                    this.space.step(dt);
                    break;
                case rss.box2D:
                    this.space.Step(dt, 8, 3)
                    break;
            }

            this.layer.update();
        }
    })
}