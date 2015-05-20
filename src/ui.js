rss.ui = {
    FONT_SIZE: 45,

    menuItemLabel: function (name, callBack) {
        var winSize = cc.director.getWinSize()
        var width = winSize.width
        var height = this.FONT_SIZE

        var lbl = cc.LabelTTF.create(
            name,
            "res/Arial.ttf", this.FONT_SIZE,
            cc.size(width, height),
            cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_CENTER
        )

        var item = new cc.MenuItemLabel(
            lbl,
            callBack,
            this
        )

        return item
    },

    menuItemImage: function(args) {
        cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist)

        //var item = new cc.MenuItemImage()
        //item.initWithNormalImage(args.normal, args.selected, null, args.callBack, this)
        //item.setScale(50, 50)
        var normal = new cc.Sprite(args.normal, cc.rect(100, 100, 100, 100))
        var selected = new cc.Sprite(args.selected, cc.rect(100, 100, 100, 100))
        var item = new cc.MenuItemSprite(normal, selected, null, args.callBack, this)
        return item
    }
}