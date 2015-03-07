var BaseLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
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