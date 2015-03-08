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
        ctor: function () {
            this._super();
        },

        init: function () {
            this._super()

            var space = new cp.Space();

            var draw = new cc.DrawNode()
            this.addChild(draw)

            this.addChild(new Man(space, draw))
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();
            var layer = new ExampleBody.Layer();
            layer.init();
            this.addChild(layer);
        }
    })
}

var Man = cc.Node.extend({


    space: null,
    _draw: null,

    ctor: function(space, draw) {
        this._super()

        this.space = space
        this._draw = draw

        this.init()
    },

    init: function() {
        cc.log("Man.init ...")
        this._super()

        // legs
        var legP = this._constructLeg(config.CENTER - config.LEG_WIDTH - config.CROTCH_WIDTH / 2, 0)
        this._constructLeg(config.CENTER + config.CROTCH_WIDTH / 2, 0)

        // torso
        var torsoP = this._constructTorso(
            this.worldX(config.CENTER - config.TORSO_WIDTH / 2),
            legP.y + config.CROTCH_HEIGHT)

        // arms
        this._constructArm(
            this.worldX(config.CENTER - config.TORSO_WIDTH / 2 - config.ARMPIT_WIDTH - config.ARM_WIDTH),
            torsoP.y - config.ARM_HEIGHT
        )
        this._constructArm(
            this.worldX(config.CENTER + config.TORSO_WIDTH / 2 + config.ARMPIT_WIDTH),
            torsoP.y - config.ARM_HEIGHT
        )

        // head
        this._constructHead(
            this.worldX(config.CENTER - config.HEAD_SIZE / 2),
            torsoP.y + config.NECK_HEIGHT
        )
    },

    worldX: function(x) {
        var winWidth = cc.director.getWinSize().width
        return winWidth / 2 + x
    },

    worldCoords: function(x, y) {
        var winSize = cc.director.getWinSize()

        return cc.p(winSize.width / 2 + x, winSize.height / 2 + y)
    },

    _constructLimb: function(mass, pos, width, height, color) {
        // physics
        var body = new cp.Body(mass, 1.0)
        body.setPos(pos)
        this.space.addBody(body);

        var shape = new cp.BoxShape(body, width, height)
        this.space.addShape(shape)

        var blue = cc.color(0, 0, 255, 255)

        this._draw.drawRect(pos, cc.p(pos.x + width, pos.y + height), color, 2, color)

        return cc.p(pos.x, pos.y + height)
    },

    _constructLeg: function(x, y) {
        return this._constructLimb(
            1.0,
            this.worldCoords(x, y),
            config.LEG_WIDTH, config.LEG_HEIGHT,
            mrrobinsmith.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            1.0,
            cc.p(x, y),
            config.ARM_WIDTH, config.ARM_HEIGHT,
            mrrobinsmith.colors.yellow
        )
    },

    _constructTorso: function(x, y) {
        return this._constructLimb(
            1.0,
            cc.p(x, y),
            config.TORSO_WIDTH, config.TORSO_HEIGHT,
            mrrobinsmith.colors.orange
        )
    },

    _constructHead: function(x, y) {
        return this._constructLimb(
            1.0,
            cc.p(x, y),
            config.HEAD_SIZE, config.HEAD_SIZE,
            mrrobinsmith.colors.pink
        )
    }
})