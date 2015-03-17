var BaseLayer = cc.Layer.extend({
    MARGIN: 25,
    THICKNESS: 50,

    ctor: function(){
        this._super();

        this.size = cc.size(rss.winWidth - 2 * this.MARGIN, rss.winHeight - 2 * this.MARGIN)
        var winSize = cc.director.getWinSize()
        this.center = cc.p(winSize.width / 2, winSize.height / 2)
    },

    init:function() {
        this._super()

        var items = [
            rss.ui.constructMenuItem("Back", new MenuScene())
        ]
        var back = new cc.Menu(items);
        back.setPosition(rss.ui.FONT_SIZE, rss.ui.FONT_SIZE);
        this.addChild(back)
    }
});