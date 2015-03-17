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
        var items = this.menuItems()
        var menu = new cc.Menu(items);

        menu.alignItemsVertically()
        menu.setPosition(centerpos);
        this.addChild(menu);
    },

    // Add new example scenes here
    menuItems: function() {
        var items = [
            rss.ui.constructMenuItem("Animation", new ExampleAnimation.Scene()),
            rss.ui.constructMenuItem("Body", new ExampleBody.Scene()),
            rss.ui.constructMenuItem("Composite Body", new ExampleCompositeBody.Scene()),
            rss.ui.constructMenuItem("Draw", new ExampleDraw.Scene()),
            rss.ui.constructMenuItem("Touch", new ExampleTouch.Scene()),
            rss.ui.constructMenuItem("Control", new ExampleControl.Scene()),
            rss.ui.constructMenuItem("Car", new ExampleCar.Scene()),
            rss.ui.constructMenuItem("Spaceship", new ExampleSpaceship.Scene()),
            rss.ui.constructMenuItem("Spaceship2", new ExampleSpaceship2.Scene()),
            rss.ui.constructMenuItem("Chair", new ExampleChair.Scene()),
            rss.ui.constructMenuItem("Joints", new ExampleJoints.Scene())
        ]
        return items
    }
});