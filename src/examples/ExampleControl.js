/* Example of moving a body around using keyboard controls */

var ExampleControl = {
    Layer: MoveableObjectsLayer.extend({
        MARGIN: 5,

        ctor: function (space) {
            this._super(ExampleControl);

            this.r.space = space

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            this.constructMan()
            this.addChild(
                rss.Box.create({
                    pos: cc.p(0, 0),
                    size: rss.winsize()
                }).addToSpace(this.r.space))
        },

        constructMan: function() {
            this.controllee = Man2.create({
                pos: rss.center(),
                scale: 3.0,
                color: rss.colors.blue
            }).addToSpace(this.r.space)
            //this.controllee.setVel(cc.p(0,0))
            this.addChild(this.controllee)
        },

        processEvent:function (event) {
            cc.log("Processing event ...")
            var winSize = cc.director.getWinSize();
            var delta = event.getDelta();
            var curPos = this.controllee.getPos()
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this.controllee.setPos(curPos.x, curPos.x)
            curPos = null;
        },

        update: function(dt) {
            this.controllee.update(dt)
        }
    }),

    Scene: BaseScene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.man.gravity);

            this.r.layer = new ExampleControl.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update(dt);
        }
    })
}