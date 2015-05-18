Chair = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size()
        this._super(args)
    },

    init: function() {
        cc.log("this.chair.init ...")
        this._super()

        this.parts = []

        this.chair = new rss.chair()
        // legs
        var leftLeg = this._constructLeg(
            -this.chair.seat.width / 2 + this.chair.leg.width / 2,
            this.chair.leg.height / 2
        )
        leftLeg.setJointP(cc.p(
            0,
            this.chair.leg.height / 2 - this.chair.seat.height / 2)
        )

        var rightLeg = this._constructLeg(
            this.chair.seat.width / 2 - this.chair.leg.width / 2,
            this.chair.leg.height / 2
        )
        rightLeg.setJointP(cc.p(
                0,
                this.chair.leg.height / 2 - this.chair.seat.height / 2)
        )

        // seat
        var seat = this._constructSeat(
            0,
            this.chair.leg.height - this.chair.seat.height / 2
        )

        //back
        var back = this._constructBack(
            -this.chair.seat.width / 2 + this.chair.leg.width / 2,
            this.chair.leg.height - this.chair.seat.height + this.chair.back.height / 2
        )
        back.setJointP(cc.p(
            0,
            -this.chair.back.height / 2 + this.chair.seat.height / 2)
        )

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
        var part = rss.RectBody.create(args)
        part.setGroup(1)

        this.addComp(part)

        return part
    },

    _constructLeg: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(this.chair.leg.width, this.chair.leg.height),
            mass: this.chair.leg.mass
        })
    },

    _constructSeat: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(this.chair.seat.width, this.chair.seat.height),
            mass: this.chair.seat.mass
        })
    },

    _constructBack: function(x, y) {
        return this._constructPart({
            pos: cc.p(x, y),
            size: cc.size(this.chair.back.width, this.chair.back.height),
            mass: this.chair.back.mass
        })
    }
})

Chair.create = function(args) {
    return new Chair(args).init()
}