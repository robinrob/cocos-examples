var FishAnimation2 = cc.Node.extend({
    ctor: function() {
        this._super()

        this.init()
    },

    init: function() {
        this._super()

        animation = new cc.Animation([], 0.1);

        for (var i = 1; i < 4; i++) {
            var str = "res/fish/fish" + i + ".png";
            animation.addSpriteFrameWithFile(str)
        }
        cc.log("frames: " + animation.getFrames())

        var winSize = cc.director.getWinSize()
        var center = cc.p(winSize.width / 2, winSize.height / 2)

        var sprite = new cc.Sprite("res/fish/fish1.png");
        sprite.setPosition(center)
        sprite.runAction(cc.animate(animation).repeatForever());
        this.addChild(sprite)
    }
})