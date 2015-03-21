rss._CompositeStaticBody = rss._StaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        cc.log("_CompositeStaticBody.init ...")
        this._super()

        this.comps = []
        this.constraints = []
    },

    addComp: function(comp) {
        this.comps.push(comp)
    },

    addToSpace: function(space) {
        this.comps.forEach(function(comp) {
            comp.addToSpace(space)
        })
        this.constraints.forEach(function(constr) {
            space.addConstraint(constr)
        })
        return this
    },

    addConstraint: function(constr) {
        this.constraints.push(constr)
    },

    addConstraints: function(constraints) {
        var that = this
        constraints.forEach(function(constr) {
            that.constraints.push(constr)
        })
    },

    setGroup: function(group) {
        this.comps.forEach(function(comp) {
            comp.shape.group = group
        })
    },

    setCollisionType: function(type) {
        this.comps.forEach(function(comp) {
            comp.shape.setCollisionType(type)
        })
    },

    setFriction: function(u) {
        this.comps.forEach(function(comp) {
            comp.setFriction(u)
        })
    },

    setElasticity: function(e) {
        this.comps.forEach(function(comp) {
            comp.setElasticity(e)
        })
    },

    setSensor: function(bool) {
        this.comps.forEach(function(comp) {
            comp.setSensor(bool)
        })
    }
})