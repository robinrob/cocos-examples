rss._StaticBody = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.startPos = args.pos
        this.origin = args.pos
        this.jointPs = [cc.p()]

        this.size = args.size
        this.width = args.size.width
        this.height = args.size.height
    },

    init: function() {
        cc.log("_StaticBody.init ...")
        this._super()
    },

    addToSpace: function(space) {
        space.addStaticShape(this.shape)
        return this
    },

    getStartPos: function() {
        return this.startPos
    },

    getPos: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.body.getPos()
                break;
            case rss.box2D:
                return this.body.GetPosition()
                break;
        }
    },

    setPos: function(p) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.body.setPos(p)
                break;
            case rss.box2D:
                this.body.setPosition(p.x, p.y)
                break;
        }
    },

    getX: function() {
        return this.body.getPos().x
    },

    getY: function() {
        return this.body.getPos().y
    },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.size.height / 2)
    },

    getTopLeftV: function() {
        return rss.toV(this.getTopLeft())
    },

    getJointP: function(wantGlobal) {
        if (wantGlobal) {
            return rss.add(this.getPos(), this.jointPs[0])
        }
        else {
            return this.jointPs[0]
        }
    },

    setJointP: function(p) {
        this.jointPs[0] = p
    },

    getJointPs: function() {
        return this.jointPs
    },

    setJointPs: function(points) {
        this.jointPs = points
    },

    setGroup: function(group) {
        this.shape.group = group
    },

    getColor: function() {
        return this._color
    },

    setColor: function(color) {
        this._color = color
    },

    getState: function() {
        return this.state
    },

    setState: function(state) {
        this.state = state
    },

    setElasticity: function(e) {
        this.shape.setElasticity(e)
    },

    setFriction: function(f) {
        this.shape.setFriction(f)
    },

    setSensor: function(bool) {
        this.shape.setSensor(bool)
    }
})