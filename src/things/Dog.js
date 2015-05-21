var Dog = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.scale = args.scale || 1.0

        args.size = rss.s.mult(rss.dog.size, args.scale)
        this._super(args)
    },

    init: function() {
        this._super()

        // legs
        var leftLeg = this._constructLeg(rss.dog.leg.left.pos)
        leftLeg.setJointP()

        var rightLeg = this._constructLeg(rss.dog.leg.right.pos)

        // torso
        var torso = this._constructTorso(rss.dog.torso.pos)
        this.torso = torso

        // tail
        var tail = this._constructArm(rss.dog.tail.pos)

        // head
        var head = this._constructHead(rss.dog.head.pos)

        this.joinLimbs(torso, head)
        this.joinLimbs(leftArm, torso)
        this.joinLimbs(rightArm, torso)
        this.joinLimbs(leftLeg, torso)
        this.joinLimbs(rightLeg, torso)

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
        limb.setJointP(cc.p(0, limb.getHeight() / 2))

        limb.setCollisionType(rss.tag.dog);

        this.addChildComp(limb)

        return limb
    },

    _constructLeg: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.dog.leg.width, rss.dog.leg.height),
            rss.dog.leg.mass,
            rss.dog.leg.color
        )
    },

    _constructArm: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.dog.arm.width, rss.dog.arm.height),
            rss.dog.arm.mass,
            rss.dog.arm.color
        )
    },

    _constructTorso: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.dog.torso.width, rss.dog.torso.height),
            rss.dog.torso.mass,
            rss.colors.orange
        )
    },

    _constructHead: function(pos) {
        return this._constructLimb(
            pos,
            cc.size(rss.dog.head.width, rss.dog.head.height),
            rss.dog.head.mass,
            rss.colors.pink
        )
    }
})

Dog.create = function(args) {
    return new Dog(args).init()
}