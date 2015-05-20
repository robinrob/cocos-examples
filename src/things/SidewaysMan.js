var SidewaysMan = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        var scale = args.scale || 1.0
        args.size = rss.s.mult(rss.sideMan.size, scale)
        args.mass = rss.sideMan.man * scale

        this._super(args)
    },

    init: function() {
        cc.log("rss.sideMan.init...")
        this._super()

        // legs
        var leg = this._constructLeg(rss.sideMan.leg.pos)
        leg.setGroup(rss.tag.man)

        // Rotate leg and joint 90 degrees
        leg.setAngle(rss.toRad(90))
        leg.setJointP(rss.rotate90(rss.p.mult(rss.sideMan.leg.joint, this.r.scale)))
        var translation = cc.p(leg.getHeight() / 2, leg.getHeight() / 2)
        leg.translate(translation)

        // torso
        var torso = this._constructTorso(rss.sideMan.torso.pos)
        torso.setGroup(rss.tag.man)
        this.torso = torso

        // arms
        var arm = this._constructArm(rss.sideMan.arm.pos)
        arm.setGroup(rss.tag.man)
        arm.setJointP(rss.p.mult(rss.sideMan.arm.joint, this.r.scale))

        // head
        var head = this._constructHead(rss.sideMan.head.pos)
        head.setJointP(rss.p.mult(rss.sideMan.head.joint, this.r.scale))

        this.joinLimbs(leg, torso)
        this.joinLimbs(arm, torso)
        this.joinLimbs(head, torso)

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
        limb.setJointP(cc.p(0, size.height / 2))

        limb.getShape().setCollisionType(rss.tag.man);

        this.addChild(limb)
        this.addComp(limb)

        return limb
    },

    _constructLeg: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.sideMan.leg.width, rss.sideMan.leg.height),
            rss.sideMan.leg.mass,
            rss.sideMan.leg.color
        )
    },

    _constructArm: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.sideMan.arm.width, rss.sideMan.arm.height),
            rss.sideMan.arm.mass,
            rss.sideMan.arm.color
        )
    },

    _constructTorso: function(pos) {
        return this._constructLimb(
            rss.sideMan.torso.pos,
            cc.size(rss.sideMan.torso.width, rss.sideMan.torso.height),
            rss.sideMan.torso.mass,
            rss.colors.orange
        )
    },

    _constructHead: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.sideMan.head.width, rss.sideMan.head.height),
            rss.sideMan.head.mass,
            rss.colors.pink
        )
    }
})

SidewaysMan.create = function(args) {
    return new SidewaysMan(args).init()
}