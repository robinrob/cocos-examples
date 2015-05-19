Chair = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        var scale = args.scale || 1.0
        args.size = Chair.scaledSize(scale)
        args.mass = Chair.scaledMass(scale)
        this._super(args)

        this.r.scale = scale
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
        part.setGroup(1)

        this.addComp(part)

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
        this.r.seat.applyImpulse(imp) * this.getMass() / this.r.seat.getMass()
    }
})

Chair.create = function(args) {
    return new Chair(args).init()
}

Chair.scale = function(val, scale) {
    scale = scale || 1.0
    return val * scale
}

Chair.scaledWidth = function(scale) {
    return Chair.scale(rss.chair.seat.width, scale)
}

Chair.scaledHeight = function(scale) {
    return Chair.scale(rss.chair.leg.height - rss.chair.seat.height + rss.chair.back.height, scale)
}

Chair.scaledSize = function(scale) {
    return cc.size(Chair.scaledWidth(scale), Chair.scaledHeight(scale))
}

Chair.scaledMass = function(scale) {
    Chair.scale(2 * rss.chair.leg.mass +  rss.chair.seat.mass + rss.chair.back.mass, scale)
}