var BaseLayer = cc.Layer.extend({
    MARGIN:25,
    THICKNESS:50,

    ctor: function(){
        this._super();

        this.r = {}
    },

    init:function() {
        this._super()

        cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist)

        var button = new ccui.Button()
        button.setTouchEnabled(true)
        button.loadTextures("btn-back-0.png", "btn-back-1.png", "", ccui.Widget.PLIST_TEXTURE)
        button.setScale(3.0)
        button.setPosition(rss.p.add(rss.topLeft(), cc.p(100, -120)))
        button.addTouchEventListener(function() { cc.director.runScene(new MenuScene())}, this)
        button.setLocalZOrder(100)
        this.addChild(button)

        return this
    },

    getSpace: function() {
        return this.r.space
    }
});