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

        //var items = this.menuItemsChipmunk()
        var items = this.menuItemsBox2D()
        var menu = new cc.Menu(items);

        menu.alignItemsVertically()
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    // Add new example scenes here
    menuItemsChipmunk: function() {
        var items = [
            ui.constructMenuItem("Animation", new ExampleAnimation.Scene()),
            ui.constructMenuItem("Body", new ExampleBody.Scene()),
            ui.constructMenuItem("Composite Body", new ExampleCompositeBody.Scene()),
            ui.constructMenuItem("Draw", new ExampleDraw.Scene()),
            ui.constructMenuItem("Touch", new ExampleTouch.Scene()),
            ui.constructMenuItem("Control", new ExampleControl.Scene()),
            ui.constructMenuItem("Car", new ExampleCar.Scene()),
            ui.constructMenuItem("Spaceship", new ExampleSpaceship.Scene()),
            ui.constructMenuItem("Spaceship2", new ExampleSpaceship2.Scene()),
            ui.constructMenuItem("Chair", new ExampleChair.Scene()),
            ui.constructMenuItem("Joints", new ExampleChipmunkJoints.Scene())
        ]
        return items
    },

    menuItemsBox2D: function() {
        var items = [
            ui.constructMenuItem("Joints", new ExampleBox2DJoints.Scene())
        ]
        return items
    }
});