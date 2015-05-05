var ExampleScene = BaseScene.extend({
    ctor: function() {
        this._super()

        this.r = {}

        this.r.size = cc.size(rss.winWidth - 2 * this.MARGIN, rss.winHeight - 2 * this.MARGIN)
        this.r.center = cc.p(rss.winWidth / 2, rss.winHeight / 2)
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