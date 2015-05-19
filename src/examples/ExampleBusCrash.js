var ExampleBusCrash = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.r.space = space

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);

            this.init()
        },

        init: function () {
            this._super()

            cc.spriteFrameCache.addSpriteFrames(rss.res.spritesheet_plist);
            var spriteSheet = new cc.SpriteBatchNode(rss.res.spritesheet_png);

            // Create the button
            var button = new ccui.Button();
            button.setTouchEnabled(true);
            button.loadTextures("animationbuttonnormal.png", "animationbuttonpressed.png", "", ccui.Widget.PLIST_TEXTURE);
            button.setScale(3.0)
            button.setPosition(rss.p.subY(rss.top(), 300))
            button.addTouchEventListener(this.crash, this);
            this.addChild(button)

            this.addChild(
                rss.Box.create({
                    pos: rss.center(),
                    size: rss.winsize(),
                    color: rss.colors.red
                }).addToSpace(this.r.space))


            var scale = 3.0
            this.r.items = []

            this.addItem(
                Chair.create({
                    pos: rss.p.add(
                        rss.bottomLeft(),
                        cc.p(2 * Chair.scaledWidth(scale), Chair.scaledHeight(scale) / 2)
                    ),
                    scale: scale,
                    color: rss.colors.yellow
                }).addToSpace(this.r.space))


        },

        addItem: function(item) {
            this.addChild(item)
            this.r.items.push(item)
            return item
        },

        crash: function() {
            this.r.items.forEach(function(item) {
                item.applyImpulse(cc.p(1000 * item.getMass(), 0))
            })
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExampleBusCrash.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update();
        }
    })
}