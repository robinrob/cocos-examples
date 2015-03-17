var Man = cc.Node.extend({
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

        this.limbs = []

        // legs
        var leftLeg = this._constructLeg(
            this.worldX(-1 * (rss.man.width.leg + rss.man.width.crotch) / 2),
            this.worldY(rss.man.height.leg / 2)
        )

        var rightLeg = this._constructLeg(
            this.worldX(+1 * (rss.man.width.leg + rss.man.width.crotch) / 2),
            this.worldY(rss.man.height.leg / 2)
        )

        // torso
        var torso = this._constructTorso(
            this.worldX(0),
            leftLeg.getTopLeft().y + rss.man.height.crotch + rss.man.width.torso / 2)
        this.torso = torso

        // arms
        var rightArm = this._constructArm(
            this.worldX(-1 * (rss.man.width.torso + rss.man.width.armpit + rss.man.width.arm) / 2),
            torso.getTopLeft().y - rss.man.height.arm / 2
        )
        var leftArm = this._constructArm(
            this.worldX(+1 * (rss.man.width.torso + rss.man.width.armpit + rss.man.width.arm) / 2),
            torso.getTopLeft().y - rss.man.height.arm / 2
        )

        // head
        var head = this._constructHead(
            this.worldX(0),
            torso.getTopLeft().y + rss.man.height.neck + rss.man.height.head / 2
        )

        this.joinLimbs(torso, head)
        this.joinLimbs(leftArm, torso)
        this.joinLimbs(rightArm, torso)
        this.joinLimbs(leftLeg, torso)
        this.joinLimbs(rightLeg, torso)
    },

    joinLimbs: function(limb1, limb2) {
        rss.pivotJoint(this.space, limb1, limb2)
        //rss.pinJoint(this.space, limb1, limb2)
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
        var limb = new RectBody(
            pos,
            size,
            mass,
            this.space
        )
        limb.setColor(color)
        limb.setJointP(cc.p(0, size.height / 2))
        this.limbs.push(limb)

        return limb
    },

    _constructLeg: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.leg, rss.man.height.leg),
            rss.man.mass.leg,
            rss.colors.green
        )
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.arm, rss.man.height.arm),
            rss.man.mass.arm,
            rss.colors.yellow
        )
    },

    _constructTorso: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.torso, rss.man.height.torso),
            rss.man.mass.torso,
            rss.colors.orange
        )
    },

    _constructHead: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.head, rss.man.height.head),
            rss.man.mass.head,
            rss.colors.pink
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