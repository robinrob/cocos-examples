Chair = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.scale = args.scale || 1.0

        args.size = rss.s.mult(rss.chair.size, args.scale)
        args.mass = rss.chair.mass * scale
        args.clearance = rss.chair.clearance * args.scale
        this._super(args)
    },

    init: function() {
        cc.log("rss.chair.init ...")
        this._super()

        this.parts = []

        // legs
        var leftLeg = this._constructLeg(rss.chair.leg.left.pos)
        leftLeg.setJointP(rss.p.mult(rss.chair.leg.left.joint, this.r.scale))

        var rightLeg = this._constructLeg(rss.chair.leg.right.pos)
        rightLeg.setJointP(rss.p.mult(rss.chair.leg.right.joint, this.r.scale))

        // seat
        var seat = this._constructSeat(rss.chair.seat.pos)
        this.r.seat = seat

        //back
        var back = this._constructBack(rss.chair.back.pos)
        back.setJointP(rss.p.mult(rss.chair.back.joint, this.r.scale))

        this.joinParts(leftLeg, seat)
        this.joinParts(rightLeg, seat)
        this.joinParts(back, seat)

        this.setPos(this.getStartPos())

        return this
    },

    joinParts: function(part1, part2) {
        this.addConstraints(rss.fixedJoint(part1, part2))
    },

    _constructPart: function(args) {
        args.pos = rss.p.mult(args.pos, this.r.scale)
        args.size = rss.s.mult(args.size, this.r.scale)
        args.mass = args.mass * this.r.scale
        var part = rss.RectBody.create(args)
        part.setGroup(rss.tag.chair)

        this.addChildComp(part)

        return part
    },

    _constructLeg: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.leg.width, rss.chair.leg.height),
            mass: rss.chair.leg.mass
        })
    },

    _constructSeat: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.seat.width, rss.chair.seat.height),
            mass: rss.chair.seat.mass
        })
    },

    _constructBack: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.back.width, rss.chair.back.height),
            mass: rss.chair.back.mass
        })
    },

    applyImpulse: function(imp) {
        this.eachComp('applyImpulse', [imp])
        //this.r.seat.applyImpulse(imp) * this.getMass() / this.r.seat.getMass()
    }
})

Chair.create = function(args) {
    return new Chair(args).init()
}