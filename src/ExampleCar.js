/* Example of moving a body around using keyboard controls */

var ExampleCar = {
    Layer: BaseLayer.extend({
        MARGIN: 5,

        space: null,
        car: null,
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

            this.constructCar()

            this.constructWalls()

            this.constructListeners()
        },

        constructCar: function() {
            this.car = new Car(this.center, this.space)
            this.car.setVel(0, 0)
            this.addChild(this.car)
        },

        constructWalls: function() {
            new Box(cc.p(this.MARGIN, this.MARGIN), this.size, 10, this.space)
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
            var curPos = this.car.getPos()
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this.car.setPos(curPos.x, curPos.x)
            curPos = null;
        },

        update: function(dt) {
            this.car.update(dt)
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.exampleCar.gravity);

            this.layer = new ExampleCar.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}