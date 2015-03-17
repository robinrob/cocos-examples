rss._CompositeDynamicBody = rss._CompositeStaticBody.extend({
    ctor: function(pos, size, mass, space) {
        this._super(pos, size, space)
    },

    init: function() {
        this._super()
    },

    getPos: function() {
        var comX = 0.0
        var comY = 0.0
        var mass = this.getMass()

        this.comps.forEach(function(limb) {
            comX += limb.getX() * limb.mass / mass
            comY += limb.getY() * limb.mass / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(x, y) {
        var com = this.getPos()
        var deltaX = x - com.x
        var deltaY = y - com.y

        this.comps.forEach(function(limb) {
            var x = limb.getPos().x + deltaX
            var y = limb.getPos().y + deltaY
            limb.setPos(x, y)
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.comps.forEach(function(limb) {
            var vel = limb.getVel()
            vComX += vel.x * limb.mass / mass
            vComY += vel.y * limb.mass / mass
        })

        return cc.p(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.comps.forEach(function(limb) {
            limb.setVel(vx, vy)
        })
    },

    getMass: function() {
        mass = 0.0
        this.comps.forEach(function(limb) {
            mass += limb.mass
        })
        return mass
    }
})