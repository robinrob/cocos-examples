var BaseLayer = cc.Layer.extend({
    MARGIN: 25,
    THICKNESS: 50,

    ctor : function(){
        this._super();

        this.size = cc.size(rss.winWidth - 2 * this.MARGIN, rss.winHeight - 2 * this.MARGIN)
    },

    init:function() {
        this._super()

        new Box(cc.p(this.MARGIN, 0), this.size, this.THICKNESS, this.space)

        var items = [
            ui.constructMenuItem("Back", new MenuScene())
        ]
        var back = new cc.Menu(items);
        back.setPosition(ui.FONT_SIZE, ui.FONT_SIZE);
        this.addChild(back)
    }
});