var ExampleBody = {
    Layer: BaseLayer.extend({
        balls: null,
        man: null,
        space: null,
        gameLayer: null,
        center: null,

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

            this.constructMan()

            this.constructPlatform()

            this.constructBalls()

            this.constructWalls()
        },

        constructMan: function() {
            this.man = new Man(this.center, this.space)
            this.man.setVel(0, 0)
            this.addChild(this.man)
        },

        constructPlatform: function() {
            var platform = new Platform(
                cc.p(this.center.x - 20, this.center.y),
                cc.p(this.center.x + 20, this.center.y),
                2,
                this.space)
            this.addChild(platform)
        },

        constructBalls: function() {
            var pos = cc.p(this.center.x, this.center.y + 100)
            this.balls = []
            for (var i = 0; i < 10; ++i) {
                var ball = new Ball(pos, 10, rss.ball.mass, this.space)
                this.balls.push(ball)
                this.addChild(ball)
            }
        },

        constructWalls: function() {
            var winSize = cc.director.getWinSize()
            var margin = 20
            // left wall
            this.constructWall(
                cp.v(margin, rss.groundHeight),
                cp.v(margin, winSize.height * 10)
            )
            // right wall
            this.constructWall(
                cp.v(winSize.width - margin, rss.groundHeight),
                cp.v(winSize.width - margin, winSize.height * 10)
            )
            // ground
            this.constructWall(
                cp.v(margin, rss.groundHeight),
                cp.v(winSize.width - margin, rss.groundHeight)
            )

            //this.constructWall(
            //    cp.v(-winSize.width * 2, rss.groundHeight),
            //    cp.v(winSize.width * 2, rss.groundHeight)
            //)
        },

        constructWall: function(v1, v2) {
            var wall = new cp.SegmentShape(
                this.space.staticBody,
                v1, v2,
                0
            );
            wall.setElasticity(1.0)
            this.space.addStaticShape(wall);
        },

        update: function() {
            this.balls.forEach(function(ball) {
                ball.move()
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

            this.layer = new ExampleBody.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update();
        }
    })
}