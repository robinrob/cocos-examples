/* Example of moving a body around using keyboard controls */

var ExampleSpaceship = {
    Layer: MoveableObjectsLayer.extend({
        MARGIN: 5,

        space: null,
        controllee: null,
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

            this.constructControllee()

            this.constructWalls()
        },

        constructControllee: function() {
            this.controllee = new Spaceship(this.center, 10.0, this.space)
            this.controllee.setVel(0, 0)
            this.addChild(this.controllee)
        },

        constructWalls: function() {
            new Box(cc.p(this.MARGIN, this.MARGIN), this.size, 10, this.space)
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

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.exampleSpaceship.gravity);

            this.layer = new ExampleSpaceship.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}