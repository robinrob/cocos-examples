var Man = cc.Node.extend({
    startPos: null,
    space: null,
    limbs: null,

    ctor: function(position, space) {
        this._super()

        this.startPos = position
        this.space = space

        this.init()
    },

    init: function() {
        cc.log("Man.init ...")
        this._super()

        this.limbs = []

        // legs
        var legP = this._constructLeg(
            this.worldX(
                config.CENTER - config.LEG_WIDTH - config.CROTCH_WIDTH / 2),
            this.worldY(0)
        )
        this._constructLeg(
            legP.x + config.LEG_WIDTH + config.CROTCH_WIDTH,
            this.worldY(0)
        )

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
        return cc.director.getWinSize().width / 2 + x
    },

    worldY: function(y) {
        return cc.director.getWinSize().height / 2 + y
    },

    worldCoords: function(x, y) {
        var winSize = cc.director.getWinSize()

        return cc.p(winSize.width / 2 + x, winSize.height / 2 + y)
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