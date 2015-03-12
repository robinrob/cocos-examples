var Spaceship = Steerable.extend({
    mass: null,
    body: null,
    shape: null,
    sprite: null,
    startPos: null,

    ctor:function(position, mass, space) {
        cc.log("Spaceship.ctor ...")
        this._super(mass)

        this.startPos = position
        this.space = space;

        this.init()
    },

    init:function() {
        cc.log("Spaceship.init ...")
        this._super()

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(rss.res.spaceship_plist);
        var spriteSheet = new cc.SpriteBatchNode(rss.res.spaceship_png);
        //cc.spriteFrameCache.addSpriteFrames(rss.res.fish_plist);
        //var spriteSheet = new cc.SpriteBatchNode(rss.res.fish_png);

        //1. create PhysicsSprite with a sprite frame name
        this.sprite = new cc.PhysicsSprite("#0.png");
        //this.sprite = new cc.PhysicsSprite("#fish1.png");

        this.addChild(this.sprite)
        var contentSize = this.sprite.getContentSize();

        this._height = contentSize.height
        // 2. init the runner physic body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, contentSize.width, this._height))
        //3. set the position of the runner
        this.body.p = this.startPos
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width, this._height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite.setBody(this.body);


        var animFrames = [];

        for (var i = 1; i < 4; i++) {
            var str = "" + i + ".png";
            //var str = "fish" + i + ".png";
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