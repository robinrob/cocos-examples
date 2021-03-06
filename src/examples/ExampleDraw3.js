/* Example of moving a body around using keyboard controls */

var ExampleDraw3 = {
    Layer: BaseLayer.extend({
        MARGIN: 5,

        ctor: function (space) {
            this._super(ExampleDraw3);

            this.r.space = space

            this.init()
        },

        init: function () {
            this._super()

            this.man = Man.create({pos: rss.center()}).addToSpace(this.r.space)
            this.man.setVel(cc.p(0,0))
            this.addChild(this.man)

            this.addChild(
                rss.Box.create({
                    pos: cc.p(),
                    size: rss.winsize(),
                    color: rss.colors.red}
                ).addToSpace(this.r.space))
        },

        processEvent:function (event) {
            cc.log("Processing event ...")
            var winSize = cc.director.getWinSize();
            var delta = event.getDelta();
            var curPos = this.man.getPos()
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this.man.setPos(curPos.x, curPos.x)
            curPos = null;
        },

        update: function(dt) {
            this.man.draw()
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
            this.r.space.step(dt);
            this.r.layer.update(dt);
        }
    })
}