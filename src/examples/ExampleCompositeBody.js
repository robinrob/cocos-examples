var ExampleCompositeBody = {
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

            Box.create(cc.p(this.MARGIN, 0), this.r.size, this.r.space)

            this.constructMan()
            this.constructPlatform()
            this.constructBalls()
        },

        constructMan: function() {
            this.man = new Man(this.r.center, this.r.space)
            this.man.setVel(0, 0)
        },

        constructPlatform: function() {
            var platform = new Platform(
                cc.p(this.r.center.x - 20, this.r.center.y),
                cc.p(this.r.center.x + 20, this.r.center.y),
                2,
                this.r.space)
        },

        constructBalls: function() {
            this.balls = []
            for (var i = 0; i < 10; ++i) {
                var pos = rss.add(this.man.getPos(), cc.p(i * 10, 150))
                cc.log("new ball")
                var ball = new Ball(pos, 10, rss.ball.mass, this.r.space)
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

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExampleCompositeBody.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update();
        }
    })
}