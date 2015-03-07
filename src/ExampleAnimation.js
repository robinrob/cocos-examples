var ExampleAnimationLayer = BaseLayer.extend({
    ctor : function(){
        cc.log("AnimationLayer.ctor ...")
        //1. call super class's ctor function
        this._super();
    },

    init:function(){
        cc.log("AnimationLayer.init ...")
        this._super()

        cc.spriteFrameCache.addSpriteFrames(mrrobinsmith.res.fish_plist);
        var spriteSheet = new cc.SpriteBatchNode(mrrobinsmith.res.fish_png);

        var animFrames = [];
        for (var i = 1; i < 4; i++) {
            var str = "fish" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);

        var winSize = cc.director.getWinSize()
        var center = cc.p(winSize.width / 2, winSize.height / 2)

        var sprite = new cc.Sprite("#fish1.png");
        sprite.setPosition(center)
        this.addChild(sprite)
        sprite.runAction(cc.animate(animation).repeatForever());
    }
});

var ExampleAnimationScene = cc.Scene.extend({
    onEnter:function () {
        cc.log("AnimationScene.onEnter ...")
        this._super();
        var layer = new ExampleAnimationLayer();
        layer.init();
        this.addChild(layer);
    }
});