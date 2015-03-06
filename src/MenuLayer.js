var MenuLayer = cc.Layer.extend({
    FONT_SIZE: 60,

    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        //1. call super class's ctor function
        this._super();
    },

    init:function(){
        cc.log("MenuLayer.init ...")
        this._super();

        var winSize = cc.director.getWinSize();

        var centerpos = cc.p(winSize.width / 2, winSize.height / 2);

        var width = winSize.width
        var height = winSize.height
        var lbl = cc.LabelTTF.create("Click!", "res/Arial.ttf", this.FONT_SIZE, cc.size(width, height), cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_CENTER);
        var menuItemPlay = new cc.MenuItemLabel(lbl, this.onPlay, this)
        var menu = new cc.Menu(menuItemPlay);

        this.addChild(menu);
        menu.setPosition(centerpos);
    },

    onPlay : function() {
        cc.log("Play")
    }
});