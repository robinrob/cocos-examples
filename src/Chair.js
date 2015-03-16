var Chair = cc.Node.extend({
    startPos: null,
    origin: null,
    space: null,
    limbs: null,
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

        this.limbs = []

        // legs
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (rss.chair.width.leg + rss.chair.width.crotch) / 2),
            this.worldY(rss.chair.height.leg / 2)
        )
        leftLeg.setJointP(rss.addY(cc.p(), (leftLeg.height - rss.chair.height.seat / 2)))
        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.chair.width.leg + rss.chair.width.crotch) / 2),
            this.worldY(rss.chair.height.leg / 2)
        )
        rightLeg.setJointP(rss.addY(cc.p(), rightLeg.size.height / 2 - 5))

        // seat
        var seat = this._constructSeat(
            leftLeg.getJointP().x + rss.chair.width.seat / 2 - rss.chair.width.leg / 2,
            leftLeg.getJointP().y - 10
        )
        seat.setJointP(leftLeg.getJointP())
        this.seat = seat

        // back
        var back = this._constructBack(
            this.worldX((-1 * rss.chair.width.seat + rss.chair.width.back) / 2),
            seat.getTopLeft().y + rss.chair.height.seat
        )
        back.setJointP(rss.addY(cc.p(), -1 * back.size.height / 2))

        this.joinRectBodys(leftLeg, seat)
        this.joinRectBodys(rightLeg, seat)
        this.joinRectBodys(back, seat)
    },

    joinRectBodys: function(limb1, limb2) {
        rss.pinJoint(this.space, limb1, limb2)
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

    _constructRectBody: function(pos, size, mass, color) {
        var limb = new RectBody(
            pos,
            size,
            mass,
            this.space,
            color
        )
        limb.setGroup(1)
        this.addChild(limb)
        this.limbs.push(limb)

        return limb
    },

    _constructLeg: function(x, y) {
        return this._constructRectBody(
            cc.p(x, y),
            cc.size(rss.chair.width.leg, rss.chair.height.leg),
            rss.chair.mass.leg,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructRectBody(
            cc.p(x, y),
            cc.size(rss.chair.width.arm, rss.chair.height.arm),
            rss.chair.mass.arm,
            rss.colors.yellow
        )
    },

    _constructSeat: function(x, y) {
        return this._constructRectBody(
            cc.p(x, y),
            cc.size(rss.chair.width.seat, rss.chair.height.seat),
            rss.chair.mass.seat,
            rss.colors.orange
        )
    },

    _constructBack: function(x, y) {
        return this._constructRectBody(
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

        this.limbs.forEach(function(limb) {
            comX += limb.getX() * limb.mass / mass
            comY += limb.getY() * limb.mass / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(x, y) {
        var com = this.getPos()
        var deltaX = x - com.x
        var deltaY = y - com.y

        this.limbs.forEach(function(limb) {
            var x = limb.getPos().x + deltaX
            var y = limb.getPos().y + deltaY
            limb.setPos(x, y)
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.limbs.forEach(function(limb) {
            var vel = limb.getVel()
            vComX += vel.x * limb.mass / mass
            vComY += vel.y * limb.mass / mass
        })

        return cc.p(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.limbs.forEach(function(limb) {
            limb.setVel(vx, vy)
        })
    },

    getMass: function() {
        mass = 0.0
        this.limbs.forEach(function(limb) {
            mass += limb.mass
        })
        return mass
    },

    update: function() {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y

        if (x > winSize.width) {
            this.setPos(0, y)
        }
        else if (x < 0) {
            this.setPos(winSize.width, y)
        }
    }
})