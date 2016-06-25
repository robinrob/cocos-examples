var ExampleAnimation2 = {
    Layer: MoveableObjectsLayer.extend({
        ctor: function () {
            cc.log("AnimationLayer.ctor ...")
            this._super(ExampleAnimation2);

            this.init()
        },

        init: function () {
            cc.log("AnimationLayer.init ...")
            this._super()

            cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist);
            var spriteSheet = new cc.SpriteBatchNode(rss.res.spritesheet_png);

            this.r.upFrame = cc.spriteFrameCache.getSpriteFrame("spaceship0.png")
            this.r.downFrame = cc.spriteFrameCache.getSpriteFrame("spaceship_nofire.png")

            var sprite = new cc.Sprite(rss.res.spaceship_nofire_png);
            sprite.setPosition(rss.center())

            this.addChild(sprite)

            this.r.sprite = sprite
        },

        update: function() {
            if (rss.upInput()) {
                cc.log("UP")
                this.r.sprite.setSpriteFrame(this.r.upFrame)
                cc.audioEngine.playMusic(rss.res.spaceship_ogg)
            }
            else {
                cc.log("DOWN")
                this.r.sprite.setSpriteFrame(this.r.downFrame)
                cc.audioEngine.stopMusic()
            }
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleAnimation2.Layer(), 0, 1)

            this.scheduleUpdate()
        },

        update: function() {
            this.getChildByTag(1).update()
        }
    })
}