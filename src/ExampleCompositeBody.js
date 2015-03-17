var ExampleCompositeBody = {
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

            new Box(cc.p(this.MARGIN, 0), this.size, this.THICKNESS, this.space)

            this.constructMan()
            this.constructPlatform()
            this.constructBalls()
        },

        constructMan: function() {
            this.man = new Man(this.center, this.space)
            this.man.setVel(0, 0)
        },

        constructPlatform: function() {
            var platform = new Platform(
                cc.p(this.center.x - 20, this.center.y),
                cc.p(this.center.x + 20, this.center.y),
                2,
                this.space)
        },

        constructBalls: function() {
            this.balls = []
            for (var i = 0; i < 10; ++i) {
                var pos = rss.add(this.man.getPos(), cc.p(i * 10, 150))
                cc.log("new ball")
                var ball = new Ball(pos, 10, rss.ball.mass, this.space)
                this.balls.push(ball)
            }
        },

        update: function() {
            this.balls.forEach(function(ball) {
                ball.update()
            })
            this.man.update()
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExampleCompositeBody.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update();
        }
    })
}