var MenuLayer = cc.Layer.extend({
    ctor : function(example){
        cc.log("MenuLayer.ctor ...")
        this._super();

        this.example = example
    },

    init:function() {
        cc.log("MenuLayer.init ...")
        this._super();

        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        //var items = this.menuItemLabelsChipmunk()
        var items = this.menuItemLabels()
        var menu = new cc.Menu(items);

        menu.alignItemsVertically()
        menu.setPosition(centerPos);
        this.addChild(menu);



        return this
    },

    // Add example scenes here
    menuItemLabels: function() {
        var items = [
            this.newMenuItemLabel("Animation", ExampleAnimation),
            this.newMenuItemLabel("Animation2", ExampleAnimation2),
            this.newMenuItemLabel("Body", ExampleBody),
            this.newMenuItemLabel("Composite Body", ExampleCompositeBody),
            this.newMenuItemLabel("Draw", ExampleDraw),
            this.newMenuItemLabel("Draw2", ExampleDraw2),
            this.newMenuItemLabel("Physics Sprite", ExamplePhysicsSprite),
            this.newMenuItemLabel("Touch", ExampleTouch),
            this.newMenuItemLabel("Control", ExampleControl),
            //this.newMenuItemLabel("Car", ExampleCar),
            //this.newMenuItemLabel("Spaceship", ExampleSpaceship),
            //this.newMenuItemLabel("Spaceship2", ExampleSpaceship2),
            this.newMenuItemLabel("Chair", ExampleChair),
            //this.newMenuItemLabel("Joints", ExampleJoints),
            //this.newMenuItemLabel("Poly Body", ExamplePolyBody),
            //this.newMenuItemLabel("Circular Movement", ExampleCircularMovement),
            this.newMenuItemLabel("Gamepad API", ExampleGamepad),
            this.newMenuItemLabel("Bus Crash", ExampleBusCrash)
        ]
        return items
    },

    newMenuItemLabel: function(name, anim) {
        return rss.ui.menuItemLabel(name, function() { cc.director.runScene(new anim.Scene()) })
    }
});

MenuLayer.create = function() {
    return new MenuLayer().init()
}