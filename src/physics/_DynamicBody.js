rss._DynamicBody = rss._StaticBody.extend({
    ctor: function(pos, size, mass, space) {
        this._super(pos, size, space)

        this.mass = mass

        this.startV = cp.v(pos.x, pos.y)
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

    applyForce: function (fx, fy, rx, ry) {
        this.body.applyForce(cp.v(fx, fy), cp.v(rx, ry))
    },

    applyImpulse: function (ix, iy) {
        this.body.applyImpulse(cp.v(ix, iy), cp.v(0, 0))
    },

    applyImpulseAt: function (ix, iy, rx, ry) {
        this.body.applyImpulse(cp.v(ix, iy), cp.v(rx, ry))
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.body.rot.x, impulse * this.body.rot.y)
    },

    getAngle: function() {
        return -1 * cc.radiansToDegrees(this.body.a) % 360
    },

    setAngle: function(angle) {
        this.body.setAngle(-1 * cc.degreesToRadians(angle))
    },

    upInput: function() {
        return rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]
    },

    downInput: function() {
        return rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]
    },

    rightInput: function() {
        return rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]
    },

    leftInput: function() {
        return rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]
    },

    horizontalInput: function() {
        return this.rightInput() || this.leftInput()
    },

    directionInput: function() {
        return this.upInput() || this.downInput() || this.rightInput() || this.leftInput()
    }
})