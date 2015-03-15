var StaticPart = cc.Node.extend({
    ctor: function(pos, size, space) {
        this._super()

        this.pos = pos
        this.jointP = pos
        this.jointPs = [pos]

        this.size = size
        this.width = size.width
        this.height = size.height

        this.space = space
    },

    init: function() {
        this._super()
    },

    getPos: function() {
        return this.body.getPos()
    },

    setPos: function(x, y) {
        this.body.setPos(cp.v(x, y))
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

    getJointP: function() {
        return this.jointP
    },

    setJointP: function(p) {
        this.jointP = p
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

    setGroup: function(group) {
        this.shape.group = group
    },

    setColor: function(color) {
        this._color = color
    }
})