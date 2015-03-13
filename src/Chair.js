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
        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.chair.width.leg + rss.chair.width.crotch) / 2),
            this.worldY(rss.chair.height.leg / 2)
        )

        // seat
        var seat = this._constructSeat(
            this.worldX(0),
            leftLeg.getTopLeft().y)
        this.seat = seat

        // arms
        var back = this._constructBack(
            this.worldX((-1 * rss.chair.width.seat + rss.chair.width.back) / 2),
            seat.getTopLeft().y + rss.chair.height.seat
        )

        this.joinLimbs(leftLeg, seat)
        this.joinLimbs(rightLeg, seat)
        this.joinLimbs(seat, back)
    },

    joinLimbs: function(limb1, limb2) {
        this.space.addConstraint(new cp.PivotJoint(limb1.body, limb2.body, limb1.getJointV()))
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

    _constructLimb: function(pos, size, mass, color) {
        var limb = new Limb(
            pos,
            size,
            mass,
            this.space,
            color
        )
        this.addChild(limb)
        this.limbs.push(limb)

        return limb
    },

    _constructLeg: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.chair.width.leg, rss.chair.height.leg),
            rss.chair.mass.leg,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.chair.width.arm, rss.chair.height.arm),
            rss.chair.mass.arm,
            rss.colors.yellow
        )
    },

    _constructSeat: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.chair.width.seat, rss.chair.height.seat),
            rss.chair.mass.seat,
            rss.colors.orange
        )
    },

    _constructBack: function(x, y) {
        return this._constructLimb(
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