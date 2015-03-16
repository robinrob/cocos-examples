var Chair = cc.Node.extend({
    startPos: null,
    origin: null,
    space: null,
    parts: null,
    seat: null,

    ctor: function(position, space) {
        this._super()

        this.startPos = position
        this.origin = this.startPos
        this.space = space

        this.init()
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
        this.seat = seat

        // back
        var back = this._constructBack(
            this.worldX((-1 * rss.chair.width.seat + rss.chair.width.back) / 2),
            leftLeg.getJointP(true).y + (rss.chair.height.back - seat.height) / 2
        )
        back.setJointP(cc.p(0, (-1 * back.height + seat.height) / 2))

        this.joinParts(leftLeg, seat)
        this.joinParts(rightLeg, seat)
        this.joinParts(back, seat)
    },

    joinParts: function(part1, part2) {
        rss.pivotJoint(this.space, part1, part2)
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

    _constructPart: function(pos, size, mass, color) {
        var part = new RectBody(
            pos,
            size,
            mass,
            this.space)
        part.setColor(color)
        part.setGroup(1)
        this.addChild(part)
        this.parts.push(part)

        return part
    },

    _constructLeg: function(x, y) {
        return this._constructPart(
            cc.p(x, y),
            cc.size(rss.chair.width.leg, rss.chair.height.leg),
            rss.chair.mass.leg,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructPart(
            cc.p(x, y),
            cc.size(rss.chair.width.arm, rss.chair.height.arm),
            rss.chair.mass.arm,
            rss.colors.yellow
        )
    },

    _constructSeat: function(x, y) {
        return this._constructPart(
            cc.p(x, y),
            cc.size(rss.chair.width.seat, rss.chair.height.seat),
            rss.chair.mass.seat,
            rss.colors.orange
        )
    },

    _constructBack: function(x, y) {
        return this._constructPart(
            cc.p(x, y),
            cc.size(rss.chair.width.back, rss.chair.height.back),
            rss.chair.mass.back,
            rss.colors.orange
        )
    },

    getPos: function() {
        var comX = 0.0
        var comY = 0.0
        var mass = this.getMass()

        this.parts.forEach(function(part) {
            comX += part.getX() * part.mass / mass
            comY += part.getY() * part.mass / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(x, y) {
        var com = this.getPos()
        var deltaX = x - com.x
        var deltaY = y - com.y

        this.parts.forEach(function(part) {
            var x = part.getPos().x + deltaX
            var y = part.getPos().y + deltaY
            part.setPos(x, y)
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.parts.forEach(function(part) {
            var vel = part.getVel()
            vComX += vel.x * part.mass / mass
            vComY += vel.y * part.mass / mass
        })

        return cc.p(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.parts.forEach(function(part) {
            part.setVel(vx, vy)
        })
    },

    getMass: function() {
        mass = 0.0
        this.parts.forEach(function(part) {
            mass += part.mass
        })
        return mass
    }
})