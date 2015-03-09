var ExampleBody = {
    Layer: BaseLayer.extend({
        balls: null,
        man: null,
        space: null,
        gameLayer: null,

        ctor: function (space) {
            this._super();
            this.space = space

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            var draw = new cc.DrawNode()
            this.addChild(draw)

            var winSize = cc.director.getWinSize()
            var center = cc.p(winSize.width / 2, winSize.height / 2)

            this.man = new Man(center, this.space)
            this.addChild(this.man)

            var platform = new Platform(
                cc.p(center.x - 20, center.y),
                cc.p(center.x + 20, center.y),
                2,
                this.space)
            this.addChild(platform)

            var pos = cc.p(center.x, center.y + 100)

            this.balls = []
            for (var i = 0; i < 10; ++i) {
                var ball = new Ball(pos, 10, this.space, draw)
                this.balls.push(ball)
                this.addChild(ball)
            }

            var wallBottom = new cp.SegmentShape(this.space.staticBody,
                cp.v(0, rss.groundHeight),
                cp.v(winSize.width, rss.groundHeight),
                0);
            wallBottom.setElasticity(1.0)
            this.space.addStaticShape(wallBottom);
        },

        update: function(dt) {
            this.balls.forEach(function(ball) {
                ball.move()
            })
            this.man.move()
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExampleBody.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}