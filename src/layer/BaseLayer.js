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
        back.setPosition(rss.ui.FONT_SIZE, rss.ui.FONT_SIZE);
        this.addChild(back)
    },

    getSpace: function() {
        return this.r.space
    }
});