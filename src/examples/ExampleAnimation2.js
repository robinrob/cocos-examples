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
                if (!this.r.wasUpInput && !rss.config.mute) {
                    this.r.rocketEffect = rss.playEffect(rss.res.spaceship_ogg, true)
                }
                this.r.wasUpInput = true
            }
            else if (this.r.wasUpInput) {
                this.r.wasUpInput = false
                rss.stopEffect(this.r.rocketEffect)
            }
            else {
                cc.log("DOWN")
                this.r.sprite.setSpriteFrame(this.r.downFrame)
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