rss.CompositeStaticBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.comps = []
        this.r.constraints = []
    },

    init: function() {
        cc.log("CompositeStaticBody.init ...")
        this._super()

        this.r.comps = []
        this.r.constraints = []
    },

    addComp: function(comp) {
        this.r.comps.push(comp)
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

    setGroup: function(group) { this.eachComp('setGroup', [group]) },

    setCollisionType: function(type) { this.eachComp('setCollisionType', [type]) },

    setFriction: function(mu) { this.eachComp('setFriction', [mu]) },

    setElasticity: function(e) { this.eachComp('setElasticity', [e]) },

    setSensor: function(bool) { this.eachComp('setSensor', [bool]) },

    erase: function() { this.eachComp('erase', []) },

    draw: function() { this.eachComp('draw', []) }
})