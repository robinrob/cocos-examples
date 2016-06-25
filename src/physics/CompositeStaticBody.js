rss.CompositeStaticBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.comps = []
        this.r.constraints = []
    },

    init: function() {
        //cc.log("CompositeStaticBody.init ...")
        this._super()

        if (rss.config.draw && (typeof this.getColor() == "object")) {
            this.drawSelf(this.getColor())
        }
    },

    addComp: function(comp) {
        this.r.comps.push(comp)
    },

    addChildComp: function(comp) {
        this.addChild(comp)
        this.addComp(comp)
    },

    eachComp: function(funName, args) {
        this.r.comps.forEach(function(comp) {
            comp[funName].apply(comp, args)
        })
    },

    addToSpace: function(space) {
        this.r.comps.forEach(function(comp) {
            comp.addToSpace(space)
        })
        this.r.constraints.forEach(function(constr) {
            space.addConstraint(constr)
        })
        return this
    },

    addConstraint: function(constr) {
        this.addConstraints([constr])
    },

    addConstraints: function(constraints) {
        var that = this
        constraints.forEach(function(constr) {
            that.r.constraints.push(constr)
        })
    },

    drawCOM: function() {
        if (rss.config.draw) {
            this.r.draw.setPosition(this.getPos())
            this.r.draw.drawDot(cc.p(), (this.getWidth() || 100) / 6, rss.colors.red)
        }
    },

    getMass: function() {
        var mass = 0
        this.comps.forEach(function(comp) {
            mass += comp.getMass()
        })
        return mass
    },

    setGroup: function(group) { this.eachComp('setGroup', [group]) },

    setCollisionType: function(type) { this.eachComp('setCollisionType', [type]) },

    setFriction: function(mu) { this.eachComp('setFriction', [mu]) },

    setElasticity: function(e) { this.eachComp('setElasticity', [e]) },

    setSensor: function(bool) { this.eachComp('setSensor', [bool]) },

    setColor: function(col) { this.eachComp('setColor', [col])},

    erase: function() { this.eachComp('erase', []) },

    drawSelf: function(col) { this.eachComp('drawSelf', [col || this.getColor()]) }
})