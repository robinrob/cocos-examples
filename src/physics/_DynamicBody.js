rss._DynamicBody = rss._StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.mass = args.mass
    },

    init: function() {
        this._super()
    },

    addToSpace: function(space) {
        space.addBody(this.body)
        space.addShape(this.shape)
        return this
    },

    getVel: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.body.getVel()
                break;
            case rss.box2D:
                return this.body.GetVelocity()
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

    getV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.body.m
    },

    setAngle: function(deg) {
        this.body.setAngle(cc.degreesToRadians(deg))
    },

    getAngVel: function() {
        return this.body.w
    },

    setAngVel: function(w) {
        this.body.w = w
    },

    applyForce: function (f) {
        this.body.applyForce(f, cp.v(0, 0))
    },

    applyForceAt: function (f, r) {
        this.body.applyForce(f, r)
    },

    applyImpulse: function (i) {
        this.body.applyImpulse(i, cp.v(0, 0))
    },

    applyImpulseAt: function (i, r) {
        this.body.applyImpulse(i, r)
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.body.rot.x, impulse * this.body.rot.y)
    }
})