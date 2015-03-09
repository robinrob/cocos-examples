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

var Man = cc.Node.extend({
    startPos: null,
    origin: null,
    space: null,
    limbs: null,

    ctor: function(position, space) {
        this._super()

        this.startPos = position
        this.origin = this.startPos
        this.space = space

        this.init()
    },

    init: function() {
        cc.log("Man.init ...")
        this._super()

        this.limbs = []

        // legs
        var legP = this._constructLeg(
            this.worldX(-1 * (config.LEG_WIDTH + config.CROTCH_WIDTH) / 2),
            this.worldY(config.LEG_HEIGHT / 2)
        )
        this._constructLeg(
            legP.x + config.LEG_WIDTH + config.CROTCH_WIDTH,
            this.worldY(config.LEG_HEIGHT / 2)
        )

        // torso
        var torsoP = this._constructTorso(
            this.worldX(0),
            legP.y + config.CROTCH_HEIGHT + config.TORSO_HEIGHT / 2)

        // arms
        this._constructArm(
            this.worldX(-1 * (config.TORSO_WIDTH + config.ARMPIT_WIDTH + config.ARM_WIDTH) / 2),
            torsoP.y - config.ARM_HEIGHT / 2
        )
        this._constructArm(
            this.worldX((config.TORSO_WIDTH + config.ARMPIT_WIDTH + config.ARM_WIDTH) / 2),
            torsoP.y - config.ARM_HEIGHT / 2
        )

        // head
        this._constructHead(
            this.worldX(0),
            torsoP.y + config.NECK_HEIGHT + config.HEAD_SIZE / 2
        )
    },

    worldX: function(x) {
        return this.origin.x + x
    },

    worldY: function(y) {
        return this.origin.y + y
    },

    worldCoords: function(x, y) {
        return cc.p(this.origin.x + x, this.origin.y + y)
    },

    _constructLeg: function(x, y) {
        var limb = new Limb(
            x, y,
            1.0,
            config.LEG_WIDTH, config.LEG_HEIGHT,
            this.space,
            mrrobinsmith.colors.green,
            this._draw
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb.getTopLeft()
    },

    _constructArm: function(x, y) {
        var limb = new Limb(
            x, y,
            1.0,
            config.ARM_WIDTH, config.ARM_HEIGHT,
            this.space,
            mrrobinsmith.colors.yellow,
            this._draw
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb.getTopLeft()
    },

    _constructTorso: function(x, y) {
        var limb = new Limb(
            x, y,
            1.0,
            config.TORSO_WIDTH, config.TORSO_HEIGHT,
            this.space,
            mrrobinsmith.colors.orange,
            this._draw
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb.getTopLeft()
    },

    _constructHead: function(x, y) {
        var limb = new Limb(
            x, y,
            1.0,
            config.HEAD_SIZE, config.HEAD_SIZE,
            this.space,
            mrrobinsmith.colors.pink,
            this._draw
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb.getTopLeft()
    },

    move: function() {
        cc.log("limbs.length: " + this.limbs.length)
        this.limbs.forEach(function(limb) {
            limb.move()
        })
    }
})