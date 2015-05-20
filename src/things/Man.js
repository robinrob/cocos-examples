var Man = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(rss.man.width, rss.man.height)
        this._super(args)
    },

    init: function() {
        cc.log("rss.man.init...")
        this._super()

        //this.r.state = rss.player.state.jumpDown

        // legs
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (rss.man.leg.width + rss.man.crotch.width) / 2),
            this.worldY(rss.man.leg.height / 2)
        )

        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.man.leg.width + rss.man.crotch.width) / 2),
            this.worldY(rss.man.leg.height / 2)
        )

        // torso
        var torso = this._constructTorso(
            this.worldX(0),
            leftLeg.getTopLeft().y + rss.man.crotch.height + rss.man.torso.width / 2)
        this.torso = torso

        // arms
        var rightArm = this._constructArm(
            this.worldX(-1 * (rss.man.torso.width + rss.man.armpit.width + rss.man.arm.width) / 2),
            torso.getTopLeft().y - rss.man.arm.height / 2
        )
        var leftArm = this._constructArm(
            this.worldX(+1 * (rss.man.torso.width + rss.man.armpit.width + rss.man.arm.width) / 2),
            torso.getTopLeft().y - rss.man.arm.height / 2
        )

        // head
        var head = this._constructHead(
            this.worldX(0),
            torso.getTopLeft().y + rss.man.neck.height + rss.man.head.height / 2
        )

        this.joinLimbs(torso, head)
        this.joinLimbs(leftArm, torso)
        this.joinLimbs(rightArm, torso)
        this.joinLimbs(leftLeg, torso)
        this.joinLimbs(rightLeg, torso)

        return this
    },

    joinLimbs: function(limb1, limb2) {
        this.addConstraints(rss.pivotJoint(limb1, limb2))
    },

    worldX: function(x) {
        return this.r.origin.x + x
    },

    worldY: function(y) {
        return this.r.origin.y + y
    },

    worldCoords: function(pos) {
        return cc.p(this.r.origin.x + x, this.r.origin.y + y)
    },

    _constructLimb: function(pos, size, mass, color) {
        var limb = rss.RectBody.create({
            pos: pos,
            size: size,
            mass: mass
        })
        limb.setColor(color)
        // Joints for all limbs are placed on top edge of limb
        limb.setJointP(cc.p(0, size.height / 2))

        limb.getShape().setCollisionType(rss.tag.man);

        this.addChild(limb)
        this.addComp(limb)

        return limb
    },

    _constructLeg: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.man.leg.width, rss.man.leg.height),
            rss.man.leg.mass,
            rss.man.leg.color
        )
    },

    _constructArm: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.man.arm.width, rss.man.arm.height),
            rss.man.arm.mass,
            rss.man.arm.color
        )
    },

    _constructTorso: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.man.torso.width, rss.man.torso.height),
            rss.man.torso.mass,
            rss.colors.orange
        )
    },

    _constructHead: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.man.head.width, rss.man.head.height),
            rss.man.head.mass,
            rss.colors.pink
        )
    }
})

Man.create = function(args) {
    return new Man(args).init()
}