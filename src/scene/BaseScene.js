var BaseScene = cc.Scene.extend({
    ctor: function() {
        this._super()

        this.r = {}
    },

    init: function() {
        this._super()
    },

    getLayer: function() {
        return this.r.layer
    },

    getSpace: function() {
        return this.r.space
    }
})