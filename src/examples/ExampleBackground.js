var ExampleBackground = {
    Layer: MoveableObjectsLayer.extend({

        MARGIN: 5,
        ctor: function () {
            cc.log("BackgroundLayer.ctor ...")
            this._super(ExampleBackground);

            this.init()
        },

        init: function () {
            cc.log("BackgroundLayer.init ...")
            this._super()

            //create the background image and position it at the center of screen
            this.spriteBG1 = cc.Sprite.create("#play_bg.png")
            this.spriteBG1.setPosition(cc.p(
                rss.center().x,
                rss.center().y
            ))
            this.addChild(this.spriteBG1, 0);

            this.spriteBG2 = cc.Sprite.create("#play_bg.png")
            this.spriteBG2.setPosition(cc.p(
                rss.center().x + this.spriteBG1.width - 1,
                rss.center().y
            ))
            this.addChild(this.spriteBG2, 0);

            this.addChild(rss.ui.restartButton(ExampleBackground))

            var draw = cc.DrawNode.create()
            var width = 640
            var height = 320
            var color = rss.colors.red
            draw.drawRect(
                cc.p(-1 * width / 2, -1 * height / 2),
                cc.p(+1 * width / 2, +1 * height / 2),
                rss.setAlpha(color, 0),
                10,
                rss.setAlpha(color, 255)
            )
            draw.setPosition(rss.center())
            this.addChild(draw)
        },

        update: function(dt) {
            var speed = 300
            var movement = speed * dt
            var width = this.spriteBG1.width
            var left = rss.p.subX(rss.center(), width)

            var pos1 = this.spriteBG1.getPosition()
            var newX1 = pos1.x - movement

            var pos2 = this.spriteBG2.getPosition()
            var newX2 = pos2.x - movement

            if (newX1 < left.x) {
                this.spriteBG1.setPosition(rss.p.addX(pos2, width - movement - 1))
            } else {
                this.spriteBG1.setPosition(rss.p.subX(pos1, movement))
            }

            if (newX2 < left.x) {
                this.spriteBG2.setPosition(rss.p.addX(pos1, width - movement - 1))
            } else {
                this.spriteBG2.setPosition(rss.p.subX(pos2, movement))
            }
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleBackground.Layer(), 0, rss.tag.layer);

            this.scheduleUpdate()
        },

        update: function(dt) {
            this.getChildByTag(rss.tag.layer).update(dt);
        }
    })
}