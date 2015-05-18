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
        var leftLeg = this._constructLeg(this.chair.leg.left.pos)
        leftLeg.setJointP(this.chair.leg.left.joint)

        var rightLeg = this._constructLeg(this.chair.leg.right.pos)
        rightLeg.setJointP(this.chair.leg.right.joint)

        // seat
        var seat = this._constructSeat(this.chair.seat.pos)

        //back
        var back = this._constructBack(this.chair.back.pos)
        back.setJointP(this.chair.back.joint)

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