var MenuLayer = cc.Layer.extend({
    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        this._super();
    },

    init:function() {
        cc.log("MenuLayer.init ...")
        this._super();

        var winSize = cc.director.getWinSize();
        var centerpos = cc.p(winSize.width / 2, winSize.height / 2);

        var items = this.menuItems()
        var menu = new cc.Menu(items);

        menu.alignItemsVertically()
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    // Add new example scenes here
    menuItems: function() {
        var items = [
            ui.constructMenuItem("Animation", new ExampleAnimation.Scene()),
            ui.constructMenuItem("Body", new ExampleBody.Scene()),
            ui.constructMenuItem("Draw", new ExampleDraw.Scene()),
            ui.constructMenuItem("Touch", new ExampleTouch.Scene()),
            ui.constructMenuItem("Control", new ExampleControl.Scene()),
            ui.constructMenuItem("Car", new ExampleCar.Scene()),
            ui.constructMenuItem("Spaceship", new ExampleSpaceship.Scene())
        ]
        return items
    }
});