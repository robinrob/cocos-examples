var ui = {
    FONT_SIZE: 45,

    constructMenuItem: function (name, scene) {
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
            function () {
                cc.director.runScene(scene)
            },
            this
        )

        return item
    }
}