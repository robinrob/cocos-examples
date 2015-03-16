var StaticPart = cc.Node.extend({
    ctor: function(pos, size, space) {
        this._super()

        this.startPos = pos
        this.jointPs = [pos]

        this.size = size
        this.width = size.width
        this.height = size.height

        this.space = space

        this.globalJointCoords = false
    },

    init: function() {
        this._super()
    },

    getStartPos: function() {
        return this.startPos
    },

    getPos: function() {
        return this.body.getPos()
    },

    setPos: function(p) {
        this.body.setPos(p)
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

    getJointV: function() {
        return rss.toV(this.jointP)
    },

    setGlobalJointCoords: function(bool) {
        this.globalJointCoords = bool
    },

    setGroup: function(group) {
        this.shape.group = group
    },

    setColor: function(color) {
        this._color = color
    }
})