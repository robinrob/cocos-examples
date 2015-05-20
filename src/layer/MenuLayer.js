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

        //var items = this.menuItemLabelsChipmunk()
        var items = this.menuItemLabels()
        var menu = new cc.Menu(items);

        menu.alignItemsVertically()
        menu.setPosition(centerpos);
        this.addChild(menu);

        return this
    },

    // Add new example scenes here
    menuItemLabels: function() {
        var items = [
            this.newMenuItemLabel("Animation", new ExampleAnimation.Scene()),
            this.newMenuItemLabel("Animation2", new ExampleAnimation2.Scene()),
            this.newMenuItemLabel("Body", new ExampleBody.Scene()),
            this.newMenuItemLabel("Composite Body", new ExampleCompositeBody.Scene()),
            this.newMenuItemLabel("Draw", new ExampleDraw.Scene()),
            this.newMenuItemLabel("Draw2", new ExampleDraw2.Scene()),
            this.newMenuItemLabel("Physics Sprite", new ExamplePhysicsSprite.Scene()),
            this.newMenuItemLabel("Touch", new ExampleTouch.Scene()),
            this.newMenuItemLabel("Control", new ExampleControl.Scene()),
            //this.newMenuItemLabel("Car", new ExampleCar.Scene()),
            //this.newMenuItemLabel("Spaceship", new ExampleSpaceship.Scene()),
            //this.newMenuItemLabel("Spaceship2", new ExampleSpaceship2.Scene()),
            this.newMenuItemLabel("Chair", new ExampleChair.Scene()),
            //this.newMenuItemLabel("Joints", new ExampleJoints.Scene()),
            //this.newMenuItemLabel("Poly Body", new ExamplePolyBody.Scene()),
            //this.newMenuItemLabel("Circular Movement", new ExampleCircularMovement.Scene()),
            this.newMenuItemLabel("Gamepad API", new ExampleGamepad.Scene()),
            this.newMenuItemLabel("Bus Crash", new ExampleBusCrash.Scene())
        ]
        return items
    },

    newMenuItemLabel: function(name, scene) {
        return rss.ui.menuItemLabel(name, function() { cc.director.runScene(scene) })
    }
});

MenuLayer.create = function() {
    return new MenuLayer().init()
}