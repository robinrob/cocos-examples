/* Example of moving a body around using keyboard controls */

var MoveableObjectsLayer = BaseLayer.extend({
    ctor: function (space) {
        this._super();
    },

    init: function () {
        this._super()

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
                onMouseMan: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().processEvent(event);
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMand:function (touches, event) {
                    var touch = touches[0];
                    if (this.prevTouchId != touch.getID())
                        this.prevTouchId = touch.getID();
                    else event.getCurrentTarget().processEvent(touches[0]);
                }
            }, this);
        }
    }

    //processEvent:function (event) {
        // Example implementation
        //var winSize = cc.director.getWinSize();
        //var delta = event.getDelta();
        //var curPos = this.man.getPos()
        //curPos = cc.pAdd(curPos, delta);
        //curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
        //// Do stuff here
        //curPos = null;
    //}
})