/* Example of moving a body around using keyboard controls */

var ExampleControl = {
    Layer: MoveableObjectsLayer.extend({
        MARGIN: 5,

        space: null,
        man: null,
        size: null,

        ctor: function (space) {
            this._super();

            this.space = space

            var winSize = cc.director.getWinSize()

            this.size = cc.size(winSize.width - 2 * this.MARGIN, winSize.height - rss.groundHeight)
            this.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            this.constructMan()

            this.constructWalls()
        },

        constructMan: function() {
            this.man = new Man2(this.center, this.space)
            this.man.setVel(0, 0)
            this.addChild(this.man)
        },

        constructWalls: function() {
            new Box(cc.p(this.MARGIN, this.MARGIN), this.size, 10, this.space)
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
            this.man.update(dt)
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.exampleMan.gravity);

            this.layer = new ExampleControl.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}