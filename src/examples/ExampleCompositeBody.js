var ExampleCompositeBody = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super(ExampleCompositeBody);
            this.r.space = space

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            rss.Box.create({pos: cc.p(this.MARGIN, 0), size: rss.winsize()}).addToSpace(this.r.space)

            this.constructMan()
            this.constructBalls()
        },

        constructMan: function() {
            this.man = Man.create({
                pos: rss.center(),
                scale: 2.0
            }).addToSpace(this.r.space)
            this.man.setVel(cc.p(0, 0))
        },

        constructBalls: function() {
            this.balls = []
            for (var i = 0; i < 10; ++i) {
                var pos = rss.p.add(this.man.getPos(), cc.p(i * 10, 150))
                cc.log("new ball")
                var ball = Ball.create({pos: pos, radius: 10, mass: rss.ball.mass, space: this.r.space})
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

    Scene: BaseScene.extend({
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