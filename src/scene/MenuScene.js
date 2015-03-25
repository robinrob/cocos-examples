var MenuScene = cc.Scene.extend({
    onEnter:function () {
        cc.log("MenuScene.onEnter ...")
        this._super();

        this.addChild(MenuLayer.create());
    }
});