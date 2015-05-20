var Man = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.scale = args.scale || 1.0

        args.size = rss.s.mult(rss.man.size, args.scale)
        this._super(args)
    },

    init: function() {
        cc.log("rss.man.init...")
        this._super()

        // legs
        var leftLeg = this._constructLeg(rss.man.leg.left.pos)

        var rightLeg = this._constructLeg(rss.man.leg.right.pos)

        // torso
        var torso = this._constructTorso(rss.man.torso.pos)
        this.torso = torso

        // arms
        var rightArm = this._constructArm(rss.man.arm.right.pos)
        var leftArm = this._constructArm(rss.man.arm.left.pos)

        // head
        var head = this._constructHead(rss.man.head.pos)

        //this.joinLimbs(torso, head)
        //this.joinLimbs(leftArm, torso)
        //this.joinLimbs(rightArm, torso)
        //this.joinLimbs(leftLeg, torso)
        //this.joinLimbs(rightLeg, torso)

        this.setPos(this.getStartPos())

        return this
    },

    joinLimbs: function(limb1, limb2) {
        this.addConstraints(rss.pivotJoint(limb1, limb2))
    },

    _constructLimb: function(pos, size, mass, color) {
        var limb = rss.RectBody.create({
            pos: rss.p.mult(pos, this.r.scale),
            size: rss.s.mult(size, this.r.scale),
            mass: mass * this.r.scale
        })
        limb.setColor(color)
        // Joints for all limbs are placed on top edge of limb
        //limb.setJointP(cc.p(0, size.height / 2))

        limb.setCollisionType(rss.tag.man);

        this.addChildComp(limb)

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