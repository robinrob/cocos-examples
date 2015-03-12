var FishAnimation2 = cc.Node.extend({
    ctor: function() {
        this._super()
    },

    init: function() {
        this._super()

        cc.spriteFrameCache.addSpriteFrames(rss.res.fish_plist);
        var spriteSheet = new cc.SpriteBatchNode(rss.res.fish_png);

        //var animFrames = [];
        //for (var i = 1; i < 4; i++) {
        //    var str = "fish" + i + ".png";
        //    var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //    animFrames.push(frame);
        //}

        var animation = new cc.Animation()

        for (var i = 1; i < 4; i++) {
            var str = "res/fish/fish" + i + ".png";
            animation.addSpriteFrameWithFile(str)
        }

        var animation = new cc.Animation(animFrames, 0.1);

        var winSize = cc.director.getWinSize()
        var center = cc.p(winSize.width / 2, winSize.height / 2)

        var sprite = new cc.Sprite("#fish1.png");
        sprite.setPosition(center)
        this.addChild(sprite)
        sprite.runAction(cc.animate(animation).repeatForever());
    }
})