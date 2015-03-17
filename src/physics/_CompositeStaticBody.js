rss._CompositeStaticBody = rss._StaticBody.extend({
    ctor: function(pos, size, space) {
        this._super(pos, size, space)
    },

    init: function() {
        this._super()

        this.comps = []
    },

    addComp: function(comp) {
        this.comps.push(comp)
    },

    setGroup: function(group) {
        this.comps.forEach(function(comp) {
            comp.shape.group = group
        })
    },

    setFriction: function(u) {
        this.comps.forEach(function(limb) {
            limb.shape.setFriction(u)
        })
    },

    setElasticity: function(e) {
        this.comps.forEach(function(limb) {
            limb.shape.setElasticity(e)
        })
    }
})