var Man = cc.Node.extend({
    startPos: null,
    origin: null,
    space: null,
    limbs: null,
    torso: null,

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

        //this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this._width, this._height))
        //this.space.addBody(this.body)
        //this.body.setPos(this.startV)
        //
        //var shape = new cp.BoxShape(this.body, this._width, this._height)
        //var shape = this.space.addShape(shape)
        //shape.setElasticity(0);

        this.limbs = []

        // legs
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (rss.cfg.width.leg + rss.cfg.width.crotch) / 2),
            this.worldY(rss.cfg.height.leg / 2)
        )
        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.cfg.width.leg + rss.cfg.width.crotch) / 2),
            this.worldY(rss.cfg.height.leg / 2)
        )

        // torso
        var torso = this._constructTorso(
            this.worldX(0),
            leftLeg.getTopLeft().y + rss.cfg.width.torso + rss.cfg.height.torso / 2)
        this.torso = torso

        // arms
        var rightArm = this._constructArm(
            this.worldX(-1 * (rss.cfg.width.torso + rss.cfg.width.armpit + rss.cfg.width.arm) / 2),
            torso.getTopLeft().y - rss.cfg.height.arm / 2
        )
        var leftArm = this._constructArm(
            this.worldX(+1 * (rss.cfg.width.torso + rss.cfg.width.armpit + rss.cfg.width.arm) / 2),
            torso.getTopLeft().y - rss.cfg.height.arm / 2
        )

        // head
        var head = this._constructHead(
            this.worldX(0),
            torso.getTopLeft().y + rss.cfg.height.neck + rss.cfg.height.head / 2
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
            cc.size(rss.cfg.width.leg, rss.cfg.height.leg),
            1.0,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.cfg.width.arm, rss.cfg.height.arm),
            1.0,
            rss.colors.yellow
        )
    },

    _constructTorso: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.cfg.width.torso, rss.cfg.height.torso),
            1.0,
            rss.colors.orange
        )
    },

    _constructHead: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.cfg.width.head, rss.cfg.height.head),
            1.0,
            rss.colors.pink
        )
    },

    getPosition: function() {

    },

    move: function() {
        var p = this.torso.getPos()

        var winSize = cc.director.getWinSize()
        if (p.x > winSize.width) {
            this.limbs.forEach(function(limb) {
                var diff = winSize.width - limb.getPos().x
                limb.setPos(0, p.y)
            })
        }
        else if (p.x < 0) {
            this.limbs.forEach(function(limb) {
                limb.setPos(winSize.width, p.y)
            })
        }
    }
})