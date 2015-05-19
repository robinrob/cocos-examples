/* Example of moving a body around using keyboard controls */

var ExampleCar = {
    Layer: BaseLayer.extend({
        MARGIN: 5,

        ctor: function (space) {
            this._super();

            this.r.space = space

            this.init()

            //this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            //this._debugNode.setVisible(true);
            //// Parallax ratio and offset
            //this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            rss.Box.create({pos: cc.p(this.MARGIN, 0), size: rss.winsize()}).addToSpace(this.r.space)

            this.car = Car.create({pos: rss.center()}).addToSpace(this.r.space)
            this.addChild(this.car)

            this.constructListeners()
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

    Scene: BaseScene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.exampleCar.gravity);

            this.r.layer = new ExampleCar.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update(dt);
        }
    })
}