var ExampleScene = BaseScene.extend({
    ctor: function() {
        this._super()

        this.r.size = cc.size(rss.winWidth - 2 * this.MARGIN, rss.winHeight - 2 * this.MARGIN)
        this.r.center = cc.p(rss.winWidth / 2, rss.winHeight / 2)
    },

    init: function() {
        this._super()
    },

    getLayer: function() {
        return this.r.layer
    }
})

ExampleScene.Layer = BaseLayer.extend({
    MARGIN: 25,
    THICKNESS: 50,

    ctor: function (space) {
        this._super();
    },

    init: function () {
        this._super()

        var items = [
            rss.ui.constructMenuItem("Back", new MenuScene())
        ]
        var back = new cc.Menu(items);
        back.setPosition(rss.ui.FONT_SIZE, rss.ui.FONT_SIZE);
        this.addChild(back)
    }
})