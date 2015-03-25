rss._StaticBody = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}

        this.r.startPos = args.pos
        this.r.origin = args.pos
        this.r.jointPs = [cc.p()]

        this.r.size = args.size
        this.r.width = args.size.width
        this.r.height = args.size.height
    },

    init: function() {
        cc.log("_StaticBody.init ...")
        this._super()
    },

    addToSpace: function(space) {
        space.addStaticShape(this.r.shape)
        return this
    },

    getStartPos: function() {
        return this.r.startPos
    },

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

    getX: function() {
        return this.r.body.getPos().x
    },

    getY: function() {
        return this.r.body.getPos().y
    },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.r.size.height / 2)
    },

    getTopLeftV: function() {
        return rss.toV(this.getTopLeft())
    },

    getJointP: function(wantGlobal) {
        if (wantGlobal) {
            return rss.add(this.getPos(), this.r.jointPs[0])
        }
        else {
            return this.r.jointPs[0]
        }
    },

    setJointP: function(p) {
        this.r.jointPs[0] = p
    },

    getJointPs: function() {
        return this.r.jointPs
    },

    setJointPs: function(points) {
        this.r.jointPs = points
    },

    setGroup: function(group) {
        this.r.shape.group = group
    },

    getColor: function() {
        return this.r.color
    },

    setColor: function(color) {
        this.r.color = color
    },

    getState: function() {
        return this.r.state
    },

    setState: function(state) {
        this.r.state = state
    },

    setElasticity: function(e) {
        this.r.shape.setElasticity(e)
    },

    setFriction: function(f) {
        this.r.shape.setFriction(f)
    },

    setSensor: function(bool) {
        this.r.shape.setSensor(bool)
    }
})