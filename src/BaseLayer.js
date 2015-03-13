var BaseLayer = cc.Layer.extend({
    MARGIN: 20,

    ctor : function(){
        this._super();

        this.size = cc.size(rss.winWidth - 2 * this.MARGIN, rss.winHeight - 2 * this.MARGIN)
    },

    init:function() {
        this._super()

        var items = [
            ui.constructMenuItem("Back", new MenuScene())
        ]
        var back = new cc.Menu(items);
        back.setPosition(ui.FONT_SIZE, ui.FONT_SIZE);
        this.addChild(back)
    }
});