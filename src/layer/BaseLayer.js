var BaseLayer = cc.Layer.extend({
    MARGIN:25,
    THICKNESS:50,

    ctor: function(){
        this._super();

        this.r = {}
    },

    init:function() {
        this._super()

        var items = [
            rss.ui.constructMenuItem("Back", new MenuScene())
        ]
        var back = new cc.Menu(items);
        back.setPosition(2 * rss.ui.FONT_SIZE, 2 * rss.ui.FONT_SIZE)
        this.addChild(back)

        return this
    },

    getSpace: function() {
        return this.r.space
    }
});