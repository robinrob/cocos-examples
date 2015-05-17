rss.RectPhysicsSprite = rss.RectBody.extend({
    ctor: function(args) {
        var scale = args.scale || 1.0
        var sprite = new cc.PhysicsSprite(args.spriteFrame)
        sprite.setScale(scale)
        args.size = rss.multS(sprite.getContentSize(), scale)
        this._super(args)

        this.r.sprite = sprite
        this.r.scale = scale

        this.spriteFrame = args.spriteFrame
    },

    init: function() {
        this._super()

        this.r.sprite.setBody(this.r.body)
        this.addChild(this.r.sprite)

        return this
    },

    animate: function(frameNames) {
        var animFrames = [];

        frameNames.forEach(function() {
            animFrames.push(cc.spriteFrameCache.getSpriteFrame(str))
        })

        this.animation = new cc.Animation(animFrames, 0.1);

        this.r.sprite.runAction(cc.animate(this.animation).repeatForever());
    }
})

rss.RectPhysicsSprite.create = function(args) {
    return new rss.RectPhysicsSprite(args).init()
}