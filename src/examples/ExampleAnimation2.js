var ExampleAnimation2 = {
    Layer: BaseLayer.extend({
        ctor: function () {
            cc.log("AnimationLayer.ctor ...")
            this._super();

            this.init()
        },

        init: function () {
            cc.log("AnimationLayer.init ...")
            this._super()

            var winSize = cc.director.getWinSize()
            var center = cc.p(winSize.width / 2, winSize.height / 2)

            cc.spriteFrameCache.addSpriteFrames(rss.res.spaceship_plist);
            var spriteSheet = new cc.SpriteBatchNode(rss.res.spaceship_png);
            var sprite = new cc.Sprite("#spaceship0.png");
            sprite.setPosition(center)

            var animFrames = []
                
                [cc.spriteFrameCache.getSpriteFrame("spaceship0.png")];
            var animation = new cc.Animation(animFrames, 0.1);
            this.upAction = cc.animate(animation).repeatForever()

            animFrames = [cc.spriteFrameCache.getSpriteFrame(res.spaceship_nofire_png)];
            animation = new cc.Animation(animFrames, 0.1);
            this.downAction = cc.animate(animation).repeatForever()

            sprite.runAction(this.downAction);
            this.addChild(sprite)

            this.r.sprite = sprite
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleAnimation2.Layer());
        }
    })
}