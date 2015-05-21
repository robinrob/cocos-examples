rss.StaticBody = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}

        this.r.startPos = args.pos
        this.r.origin = args.pos
        this.r.jointPs = [cc.p()]

        this.r.size = args.size
        this.r.clearance = args.clearance
        this.r.scale = args.scale

        this.r.color = args.color

        this.r.draw = new cc.DrawNode()
        this.addChild(this.r.draw)
    },

    init: function() {
        rss.log("StaticBody.init ...")
        this._super()
    },

    addToSpace: function(space) {
        space.addStaticShape(this.r.shape)
        return this
    },

    removeFromSpace: function(space) {
        var body = this.getBody()
        if (typeof body == "object") {
            //rss.log("CHECKING CONSTRAINTS")
            //space.constraints.forEach(function(constr) {
            //    //rss.log("CHECKING CONSTRAINT")
            //    if ((constr.a == body) || (constr.b == body)) {
            //        rss.log("REMOVING CONSTRAINT")
            //        space.removeConstraint(constr)
            //    }
            //})
            space.removeBody(body)
        }

        var shape = this.getShape()
        if (typeof shape == "object") {
            space.removeShape(shape)
        }

        if (typeof this.r.draw == "object") {
            this.r.shouldDraw = false
            this.r.draw.removeFromParent()
        }

        this.removeFromParent()
    },

    getStartPos: function() { return this.r.startPos },

    getPos: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.r.body.getPos()
                break;
            case rss.box2D:
                return this.r.body.GetPosition()
                break;
        }
    },

    setPos: function(p) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.r.body.setPos(p)
                break;
            case rss.box2D:
                this.r.body.setPosition(p.x, p.y)
                break;
        }
    },

    getX: function() { return this.r.body.getPos().x },

    getY: function() { return this.r.body.getPos().y },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.r.size.height / 2)
    },

    getTopLeftV: function() { return rss.toV(this.getTopLeft()) },

    getStartPos: function() { return this.r.startPos },

    getAngle: function() { return this.r.body.a },

    getAngleDeg: function() { return cc.radiansToDegrees(this.r.body.a) },

    setAngle: function(rad) { this.r.body.setAngle(rad) },

    getSize: function() { return this.r.size },

    getWidth: function() { return this.r.size.width },

    getHeight: function() { return this.r.size.height },

    getClearance: function() { return this.r.clearance },

    getRadius: function() { return this.r.radius },

    getWidthRad: function(radius) { return this.getWidth() / this.getRadius() },

    getHeightRad: function(radius) { return this.getHeight() / this.getRadius() },

    getShape: function() { return this.r.shape },

    getBody: function() { return this.r.body },

    getSprite: function() { return this.r.sprite },

    getDraw: function() { return this.r.draw },

    getStartPos: function() { return this.r.startPos },

    getOrigin: function() { return this.r.origin },

    getJointP: function(wantGlobal) {
        if (wantGlobal) {
            return rss.p.add(this.getPos(), this.r.jointPs[0])
        }
        else {
            return this.r.jointPs[0]
        }
    },

    getJointPs: function() { return this.r.jointPs },

    setJointP: function(p) { this.r.jointPs[0] = p },

    setJointPs: function(points) { this.r.jointPs = points },

    setJointR: function(ratio) { this.r.jointPs[0] = rss.p.dot(ratio, rss.s.toP(this.r.size)) },

    setJointRs: function(ratios) {
        this.r.jointPs = []
        ratios.forEach(function(ratio) {
            this.r.jointPs.push(rss.p.dot(ratio, rss.s.toP(this.r.size)))
        })
    },

    setGroup: function(group) { this.r.shape.group = group },

    getColor: function() { return this.r.color },

    setColor: function(color) { this.r.color = color },

    getState: function() { return this.r.state },

    setState: function(state) { this.r.state = state },

    setElasticity: function(e) { this.r.shape.setElasticity(e) },

    setFriction: function(f) { this.r.shape.setFriction(f) },

    setSensor: function(bool) { this.r.shape.setSensor(bool) },

    setCollisionType: function(type) { this.r.shape.setCollisionType(type) },

    translate: function(v) { this.r.body.setPos(rss.p.add(this.r.body.getPos(), v)) }
})