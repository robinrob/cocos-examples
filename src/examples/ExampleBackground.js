var ExampleBackground = {
    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new MoveableBackgroundLayer("#play_bg.png"), 0, rss.tag.layer);

            this.scheduleUpdate()
        },

        update: function(dt) {
            this.getChildByTag(rss.tag.layer).update(dt);
        }
    })
}