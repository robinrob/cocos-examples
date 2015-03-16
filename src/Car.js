var Car = cc.Node.extend({
    startPos: null,
    origin: null,
    space: null,
    parts: null,
    torso: null,

    ctor: function(position, space) {
        this._super()

        this.startPos = position
        this.origin = this.startPos
        this.space = space

        this.init()
    },

    init: function() {
        cc.log("rss.man.init ...")
        this._super()

        this.parts = []

        // wheels
        var wheel1 = this._constructCircBody(
            this.worldX(-1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )

        var wheel2 = this._constructCircBody(
            this.worldX(+1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )

        var chassis = this._constructChassis(
            this.worldX(0),
            this.worldY(rss.car.height.wheel / 2)
        )

        this.joinDynamicBodys(wheel1, chassis)
        this.joinDynamicBodys(wheel2, chassis)
    },

    _constructCircBody: function(x, y) {
        var part = this._constructCircle(
            cc.p(x, y),
            cc.size(rss.car.width.wheel, rss.car.height.wheel),
            rss.car.mass.wheel,
            rss.colors.green
        )
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
            this.space,
            color
        )
        this.addChild(part)
        this.parts.push(part)

        return part
    },

    _constructCircle: function(pos, size, mass, color) {
        var part = new CircBody(
            pos,
            size,
            mass,
            this.space,
            color
        )
        this.addChild(part)
        this.parts.push(part)

        return part
    },

    joinDynamicBodys: function(limb1, limb2) {
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