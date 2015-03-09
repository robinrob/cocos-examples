var config = {}
config.LEG_WIDTH = 10
config.LEG_HEIGHT = 40
config.LEG_MASS = 16

config.CROTCH_WIDTH = 5
config.CROTCH_HEIGHT = 5

config.ARM_WIDTH = 5
config.ARM_HEIGHT = 30
config.ARM_MASS = 6

config.ARMPIT_WIDTH = 5

config.TORSO_WIDTH = config.LEG_WIDTH * 2 + config.CROTCH_WIDTH
config.TORSO_HEIGHT = config.TORSO_WIDTH
config.TORSO_MASS = 20

config.NECK_HEIGHT = 5

config.HEAD_SIZE = 20
config.HEAD_MASS = 8

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
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (config.LEG_WIDTH + config.CROTCH_WIDTH) / 2),
            this.worldY(config.LEG_HEIGHT / 2)
        )
        var rightLeg = this._constructLeg(
            this.worldX(+1 * (config.LEG_WIDTH + config.CROTCH_WIDTH) / 2),
            this.worldY(config.LEG_HEIGHT / 2)
        )

        // torso
        var torso = this._constructTorso(
            this.worldX(0),
            leftLeg.getTopLeft().y + config.CROTCH_HEIGHT + config.TORSO_HEIGHT / 2)

        // arms
        var rightArm = this._constructArm(
            this.worldX(-1 * (config.TORSO_WIDTH + config.ARMPIT_WIDTH + config.ARM_WIDTH) / 2),
            torso.getTopLeft().y - config.ARM_HEIGHT / 2
        )
        var leftArm = this._constructArm(
            this.worldX(+1 * (config.TORSO_WIDTH + config.ARMPIT_WIDTH + config.ARM_WIDTH) / 2),
            torso.getTopLeft().y - config.ARM_HEIGHT / 2
        )

        // head
        var head = this._constructHead(
            this.worldX(0),
            torso.getTopLeft().y + config.NECK_HEIGHT + config.HEAD_SIZE / 2
        )

        this.joinLimbs(torso, head)
        this.joinLimbs(leftArm, torso)
        this.joinLimbs(rightArm, torso)
        this.joinLimbs(leftLeg, torso)
        this.joinLimbs(rightLeg, torso)
    },

    joinLimbs: function(limb1, limb2) {
        this.space.addConstraint(new cp.PivotJoint(limb1.body, limb2.body, limb1.getJointV()))
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

    _constructLimb: function(pos, size, mass, color) {
        var limb = new Limb(
            pos,
            size,
            mass,
            this.space,
            color
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb
    },

    _constructLeg: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(config.LEG_WIDTH, config.LEG_HEIGHT),
            1.0,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(config.ARM_WIDTH, config.ARM_HEIGHT),
            1.0,
            rss.colors.yellow
        )
    },

    _constructTorso: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(config.TORSO_WIDTH, config.TORSO_HEIGHT),
            1.0,
            rss.colors.orange
        )
    },

    _constructHead: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(config.HEAD_SIZE, config.HEAD_SIZE),
            1.0,
            rss.colors.pink
        )
    },

    move: function() {
        this.limbs.forEach(function(limb) {
            limb.move()
        })
    }
})