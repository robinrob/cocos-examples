var Spaceship = rss.DynamicBody.extend({
    ctor:function(position, mass, space) {
        cc.log("Spaceship.ctor ...")
        this._super(mass)

        this.r.startPos = position
        this.r.space = space;

        this.axialMult = 3.0
        this.rotMult = 0.3

        this.vertical = 90
        this.r.angleLimit = 90

        this.init()
    },

    init:function() {
        cc.log("Spaceship.init ...")
        this._super()

        this.sprite = new cc.PhysicsSprite("#0.png");

        this.addChild(this.sprite)
        var contentSize = this.sprite.getContentSize();

        this._height = contentSize.height
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, contentSize.width, this._height))
        this.r.body.p = this.r.startPos
        this.r.space.addBody(this.r.body);
        this.r.shape = new cp.BoxShape(this.r.body, contentSize.width, this._height);
        this.r.shape.setElasticity(0.0)
        this.r.space.addShape(this.r.shape);
        this.sprite.setBody(this.r.body);


        var animFrames = [];

        for (var i = 1; i < 4; i++) {
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
        return this.r.body.p
    },

    setVel: function(vx, vy) {
        this.r.body.setVel(cp.v(vx, vy))
    },

    update: function (dt) {
        var p = this.r.body.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dvx = 0.0
        var dvy = 0.0

        var impulse = this.r.mass * rss.spaceship.acc * dt

        if (this.upInput() && y <= winSize.height) {
            var sign = +1
            this.applyAxialImpulse(sign * this.axialMult * impulse)
        }
        if (this.downInput() && y >= 0) {
            var sign = -1
            this.applyAxialImpulse(sign * this.axialMult * impulse)
        }
        if (this.r.leftInput() && x >= 0) {
            this.applyTransRotImpulse(-1 * this.rotMult * impulse, dt)
        }
        if (this.r.rightInput() && x <= winSize.width) {
            this.applyTransRotImpulse(+1 * this.rotMult * impulse, dt)
        }

        if (!this.horizontalInput()) {
            this.stabilise(dt)
        }

        this.limitAngle()
        this.r.angleFromVertical()
    },

    getAngle: function() {
        return this._super() + this.vertical
    },

    setAngle: function(angle) {
        this._super(angle - this.vertical)
    },

    limitAngle: function() {
        var angle = this.getAngle()

        if (Math.abs(angle) > this.r.angleLimit) {
            this.setAngle(rss.sign(angle) * this.r.angleLimit)
        }
    },

    angleWithinLimits: function() {
      return Math.abs(this.getAngle())  < this.r.angleLimit
    },

    applyRotImpulse: function(imp) {
        this.applyImpulseAt(+1 * imp, 0, 0, +1 * this._height / 2)
        this.applyImpulseAt(-1 * imp, 0, 0, -1 * this._height / 2)
    },

    applyTransRotImpulse: function(imp, dt) {
        if (this.r.angleWithinLimits()) {
            this.applyRotImpulse(3 * imp)
        }

        var sign = rss.sign(imp)
        if ((sign > 0 && this.positiveAngle()) || (sign < 0 && !this.positiveAngle())) {
            this.applyImpulse(10 * imp, 0)
        }

        //this.applyImpulse(0, -1 * this.r.mass * rss.exampleSpaceship.gravity * dt)
    },

    positiveAngle: function() {
        return this.getAngle() > 0
    },

    stabilise: function(dt) {
        var impulse = this.r.mass * rss.spaceship.acc * dt * 0.03

        var diff = this.r.angleFromVertical()

        this.applyRotImpulse(-1 * diff * 1 * this.rotMult * impulse)
    },

    stabiliseAgain: function(dt) {
        this.stabilise(dt)
    },

    angleFromVertical: function() {
        var ang = this.getAngle()

        if (ang > 180) {
            return 360 - ang
        }
        else if (ang < -180) {
            return ang + 360
        }
        cc.log("ang: " + ang)
        return ang
    }
})