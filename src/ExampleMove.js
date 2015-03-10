/* Example of moving a body around using keyboard controls */

var ExampleMove = {
    Layer: BaseLayer.extend({
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

            this.constructListeners()
        },

        constructMan: function() {
            this.man = new Man2(this.center, this.space)
            this.man.setVel(0, 0)
            this.addChild(this.man)
        },

        constructWalls: function() {
            // left wall
            var left = this.MARGIN
            var right = this.MARGIN + this.size.width
            var bottom = rss.groundHeight
            var top = bottom + this.size.height

            // left wall
            this.constructWall(
                cp.v(left, bottom),
                cp.v(left, top)
            )
            // right wall
            this.constructWall(
                cp.v(right, bottom),
                cp.v(right, top)
            )
            // ground
            this.constructWall(
                cp.v(left, bottom),
                cp.v(right, bottom)
            )
            // ceiling
            this.constructWall(
                cp.v(left, top),
                cp.v(right, top)
            )
        },

        constructWall: function(v1, v2) {
            var wall = new cp.SegmentShape(
                this.space.staticBody,
                v1, v2,
                this.MARGIN
            );
            wall.setElasticity(1.0)
            this.space.addStaticShape(wall);
        },

        constructListeners: function() {
            if (cc.sys.capabilities.hasOwnProperty('keyboard'))
                cc.eventManager.addListener({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:function (key, event) {
                        rss.keys[key] = true;
                    },
                    onKeyReleased:function (key, event) {
                        rss.keys[key] = false;
                    }
                }, this);

            if ('mouse' in cc.sys.capabilities)
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                            event.getCurrentTarget().processEvent(event);
                    }
                }, this);

            if (cc.sys.capabilities.hasOwnProperty('touches')){
                cc.eventManager.addListener({
                    prevTouchId: -1,
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesMoved:function (touches, event) {
                        var touch = touches[0];
                        if (this.prevTouchId != touch.getID())
                            this.prevTouchId = touch.getID();
                        else event.getCurrentTarget().processEvent(touches[0]);
                    }
                }, this);
            }
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
        GRAVITY: 0,

        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, this.GRAVITY);

            this.layer = new ExampleMove.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}