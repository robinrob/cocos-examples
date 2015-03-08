var config = {}
config.LEG_WIDTH = 10
config.LEG_HEIGHT = 40

config.CROTCH_WIDTH = 5
config.CROTCH_HEIGHT = 5

config.ARM_WIDTH = 5
config.ARM_HEIGHT = 30

config.ARMPIT_WIDTH = 5

config.TORSO_WIDTH = config.LEG_WIDTH * 2 + config.CROTCH_WIDTH
config.TORSO_HEIGHT = config.TORSO_WIDTH

config.NECK_HEIGHT = 5

config.HEAD_SIZE = 20

config.SHOULDER_HEIGHT = config.TORSO_HEIGHT + config.LEG_HEIGHT

config.CENTER = config.ARM_WIDTH + config.ARMPIT_WIDTH + config.TORSO_WIDTH / 2

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
        },

        init: function () {
            this._super()

            var draw = new cc.DrawNode()
            this.addChild(draw)

            var winSize = cc.director.getWinSize()
            var center = cc.p(winSize.width / 2, winSize.height / 2)

            this.man = new Man(center, this.space, draw)
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
                cp.v(0, mrrobinsmith.groundHeight),
                cp.v(winSize.width, mrrobinsmith.groundHeight),
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
            this.space.gravity = cp.v(0, mrrobinsmith.gravity);

            this.gameLayer = new cc.Layer();
            this.gameLayer.addChild(new ExampleBody.Layer(this.space), 0, mrrobinsmith.tagOfLayer.Animation)

            this.addChild(this.gameLayer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            var layer = this.gameLayer.getChildByTag(mrrobinsmith.tagOfLayer.Animation);
            layer.update(dt);
        }
    })
}