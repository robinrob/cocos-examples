var DynamicBody = rss.DynamicBody = rss.StaticBody.extend({
    ctor: function(pos, size, mass, space) {
        this._super(pos, size, space)

        this.startV = cp.v(pos.x, pos.y)

        this.mass = mass
    },

    init: function() {
        this._super()
    },

    getVel: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                this.body.getVel()
                break;
            case rss.box2D:
                this.body.GetVelocity()
                break;
        }
    },

    setVel: function(vx, vy) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.body.setVel(cp.v(vx, vy))
                break;
            case rss.box2D:
                this.body.SetVelocity(vx, vy)
                break;
        }
    },

    applyDeltaV: function(dvx, dvy) {
        this.body.applyImpulse(cp.v(dvx, dvy), cp.v(0, 0))
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.body.m
    },

    setAngle: function(deg) {
        this.body.setAngle(cc.degreesToRadians(deg))
    }
})