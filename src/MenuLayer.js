var MenuLayer = cc.Layer.extend({
    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        this._super();
    },

    init:function() {
        cc.log("MenuLayer.init ...")
        this._super();

        var winSize = cc.director.getWinSize();
        var centerpos = cc.p(winSize.width / 2, winSize.height / 2);

        var menu = new cc.Menu(this.menuItems());
        menu.alignItemsVertically()
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    // Add new example scenes here
    menuItems: function() {
        var items = [
            ui.constructMenuItem("Animation", new ExampleAnimation.Scene())
        ]
        return items
    }
});