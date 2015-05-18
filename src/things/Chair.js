Chair = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size()
        this._super(args)
    },

    init: function() {
        cc.log("rss.chair.init ...")
        this._super()

        this.parts = []

        // legs
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (rss.chair.width.leg + rss.chair.width.crotch) / 2),
            this.worldY(rss.chair.height.leg / 2)
        )
        leftLeg.setJointP(cc.p(0, (leftLeg.height - rss.chair.height.seat) / 2))
        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.chair.width.leg + rss.chair.width.crotch) / 2),
            this.worldY(rss.chair.height.leg / 2)
        )
        rightLeg.setJointP(cc.p(0, (rightLeg.height - rss.chair.height.seat) / 2))

        // seat
        var seat = this._constructSeat(
            leftLeg.getJointP(true).x + (rss.chair.width.seat - rss.chair.width.leg) / 2,
            leftLeg.getJointP(true).y
        )

        // back
        var back = this._constructBack(
            this.worldX((-1 * rss.chair.width.seat + rss.chair.width.back) / 2),
            leftLeg.getJointP(true).y + (rss.chair.height.back - seat.height) / 2
        )
        back.setJointP(cc.p(0, (-1 * back.height + seat.height) / 2))

        this.joinParts(leftLeg, seat)
        this.joinParts(rightLeg, seat)
        this.joinParts(back, seat)

        return this
    },

    joinParts: function(part1, part2) {
        this.addConstraints(rss.fixedJoint(part1, part2))
    },

    worldX: function(x) {
        return this.r.origin.x + x
    },

    worldY: function(y) {
        return this.r.origin.y + y
    },

    worldCoords: function(x, y) {
        return cc.p(this.r.origin.x + x, this.r.origin.y + y)
    },

    _constructPart: function(args) {
        var part = rss.RectBody.create(args)
        part.setGroup(1)

        this.addComp(part)

        return part
    },

    _constructLeg: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.width.leg, rss.chair.height.leg),
            mass: rss.chair.mass.leg
        })
    },

    _constructArm: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.width.arm, rss.chair.height.arm),
            mass: rss.chair.mass.arm
        })
    },

    _constructSeat: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.width.seat, rss.chair.height.seat),
            mass: rss.chair.mass.seat
        })
    },

    _constructBack: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(rss.chair.width.back, rss.chair.height.back),
            mass: rss.chair.mass.back
        })
    }
})

Chair.create = function(args) {
    return new Chair(args).init()
}