/* Example of moving a body around using keyboard controls */

var ExampleDraw2 = {
    Layer: BaseLayer.extend({
        MARGIN: 5,

        ctor: function (space) {
            this._super();

            this.r.space = space

            this.init()
        },

        init: function () {
            this._super()

            this.addChild(Man.create({pos: rss.center()}).addToSpace(this.r.space), 0, rss.tag.man)
            this.getMan().setVel(cc.p(0,0))
            this.getMan().draw()

            this.addChild(
                rss.Box.create({
                    pos: cc.p(),
                    size: rss.winsize(),
                    color: rss.colors.red}
                ).addToSpace(this.r.space))


            var button = new ccui.Button()
            button.setTouchEnabled(true)
            button.loadTextures("animationbuttonnormal.png", "animationbuttonpressed.png", "", ccui.Widget.PLIST_TEXTURE)
            button.setColor(cc.color(255, 200, 100))
            button.setScale(3.0)
            button.setPosition(rss.p.add(rss.top(), cc.p(150, -300)))
            button.addTouchEventListener(function() {
                setTimeout(function(){
                    cc.director.pause()
                    cc.director.runScene(new ExampleDraw2.Scene())
                    cc.director.resume()
                },100)
            }, this)
            this.addChild(button)
        },

        getMan: function() {
            return this.getChildByTag(rss.tag.man)
        },

        processEvent:function (event) {
            cc.log("Processing event ...")
            var winSize = cc.director.getWinSize();
            var delta = event.getDelta();
            var curPos = this.getMan().getPos()
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this.getMan().setPos(curPos.x, curPos.x)
            curPos = null;
        },

        update: function(dt) {
            this.getMan().draw()
        }
    }),

    Scene: BaseScene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.man.gravity);

            this.r.layer = new ExampleDraw2.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            //this.r.space.step(dt);
            //this.r.layer.update(dt);
        }
    })
}