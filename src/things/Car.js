var Car = cc.Node.extend({
    ctor: function(position, space) {
        this._super()

        this.r.startPos = position
        this.r.origin = this.r.startPos
        this.r.space = space

        this.init()
    },

    init: function() {
        cc.log("rss.man.init ...")
        this._super()

        this.parts = []

        // wheels
        var wheel1 = this._constructWheel(
            this.worldX(-1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )
        wheel1.setJointP(cc.p(0, 0))

        var wheel2 = this._constructWheel(
            this.worldX(+1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )
        wheel2.setJointP(cc.p(0, 0))

        var chassis = this._constructChassis(
            this.worldX(0),
            this.worldY(rss.car.height.wheel / 2)
        )

        this.joinParts(wheel1, chassis)
        this.joinParts(wheel2, chassis)
    },

    _constructWheel: function(x, y) {
        var part = new CircBody(
            cc.p(x, y),
            rss.car.width.wheel,
            rss.car.mass.wheel,
            this.r.space
        )
        part.setColor(rss.colors.green)
        this.addChild(part)
        this.parts.push(part)

        return part
    },

    _constructChassis: function(x, y) {
        var part = this._constructBox(
            cc.p(x, y),
            cc.size(rss.car.width.chassis, rss.car.height.chassis),
            rss.car.mass.chassis,
            rss.colors.red
        )
        return part
    },

    _constructBox: function(pos, size, mass, color) {
        var part = new RectBody(
            pos,
            size,
            mass,
            this.r.space,
            color
        )
        this.addChild(part)
        this.parts.push(part)

        return part
    },

    joinParts: function(o1, o2) {
        rss.pivotJoint(this.r.space, o1, o2)
        //this.r.space.addConstraint(new cp.PivotJoint(limb1.body, limb2.body, limb1.getJointP()))
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

    getPos: function() {
        var comX = 0.0
        var comY = 0.0
        var mass = this.getMass()

        this.parts.forEach(function(limb) {
            comX += limb.getX() * limb.mass / mass
            comY += limb.getY() * limb.mass / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(x, y) {
        var com = this.getPos()
        var deltaX = x - com.x
        var deltaY = y - com.y

        this.parts.forEach(function(limb) {
            var x = limb.getPos().x + deltaX
            var y = limb.getPos().y + deltaY
            limb.setPos(x, y)
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.parts.forEach(function(limb) {
            var vel = limb.getVel()
            vComX += vel.x * limb.mass / mass
            vComY += vel.y * limb.mass / mass
        })

        return cc.p(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.parts.forEach(function(limb) {
            limb.setVel(vx, vy)
        })
    },

    getMass: function() {
        mass = 0.0
        this.parts.forEach(function(limb) {
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