var ExampleAnimation = {
    Layer: BaseLayer.extend({
        ctor: function () {
            cc.log("AnimationLayer.ctor ...")
            this._super(ExampleAnimation);

            this.init()
        },

        init: function () {
            cc.log("AnimationLayer.init ...")
            this._super()

            var animFrames = [];
            for (var i = 1; i < 4; i++) {
                var str = "fish" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }

            animation = new cc.Animation(animFrames, 0.1);

            var winSize = cc.director.getWinSize()
            var center = cc.p(winSize.width / 2, winSize.height / 2)

            var sprite = new cc.Sprite("#fish1.png");
            sprite.setPosition(center)
            sprite.runAction(cc.animate(animation).repeatForever());
            this.addChild(sprite)

            this.addChild(rss.ui.restartButton(ExampleAnimation))
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleAnimation.Layer());
        }
    })
}