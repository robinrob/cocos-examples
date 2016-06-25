rss.ui = {
    FONT_SIZE: 60,

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
    },

    restartButton: function(example) {
        var button = new ccui.Button()
        button.setTouchEnabled(true)
        button.loadTextures("animationbuttonnormal.png", "animationbuttonpressed.png", "", ccui.Widget.PLIST_TEXTURE)
        button.setColor(cc.color(255, 200, 100))
        button.setScale(3.0)
        button.setPosition(rss.p.add(rss.top(), cc.p(150, -300)))
        button.addTouchEventListener(function() {
            setTimeout(function(){
                cc.director.pause()
                cc.director.runScene(new example.Scene())
                cc.director.resume()
            },100)
        }, this)

        return button
    }
}