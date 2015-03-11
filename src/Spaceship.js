var Spaceship = Controllable.extend({
    mass: null,
    body: null,
    shape: null,
    sprite: null,
    startPos: null,

    ctor:function(position, mass, space) {
        cc.log("Ball.ctor ...")

        this._super();

        this.startPos = position
        this.mass = mass
        this.space = space;

        this.init()
    },

    init:function() {
        cc.log("Ball.init ...")
        this._super()

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(rss.res.spaceship_plist);
        this.spriteSheet = new cc.SpriteBatchNode(rss.res.spaceship_png);
        this.addChild(this.spriteSheet)

        //1. create PhysicsSprite with a sprite frame name
        this.sprite = new cc.PhysicsSprite("#0.png");
        this.spriteSheet.addChild(this.sprite);
        var contentSize = this.sprite.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = this.startPos
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite.setBody(this.body);

        //cc.log("AnimationLayer.initAction ...")
        // init runningAction
        //var animFrames = [];
        //for (var i = 0; i < 4; i++) {
        //    var str = "fish" + i + ".png";
        //    var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //    animFrames.push(frame);
        //}
        //
        //var animation = new cc.Animation(animFrames, 0.1);
        //
        //this.runningAction = cc.animate(animation).repeatForever()
        //this.runningAction.retain()
        //this.sprite.runAction(this.runningAction)

        var animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);

        var winSize = cc.director.getWinSize()
        var center = cc.p(winSize.width / 2, winSize.height / 2)

        this.sprite.runAction(cc.animate(animation).repeatForever());
    },

    getPos: function() {
        return this.body.p
    },

    setVel: function(vx, vy) {
        this.body.setVel(cp.v(vx, vy))
    }
})