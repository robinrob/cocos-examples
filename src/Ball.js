var Ball = cc.Node.extend({
    radius: null,
    mass: null,
    _draw: null,
    body: null,
    shape: null,
    sprite: null,
    startPos: null,

    ctor:function(position, radius, mass, space) {
        cc.log("Ball.ctor ...")

        this._super();

        this.radius = radius

        this.mass = mass

        this.color = cc.color(255, 0, 0, 255)

        this.space = space;

        this.startPos = position

        this.init()
    },

    init:function() {
        cc.log("Ball.init ...")
        this._super()

        var angle = Math.random() * 360

        // ball physics
        this.body = new cp.Body(this.mass, cp.momentForCircle(this.mass, 0, this.radius, cp.v(0,0)));
        this.body.p = cc.p(this.startPos.x, this.startPos.y);
        this.body.setAngle(angle)
        this.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));//run speed
        this.space.addBody(this.body);

        //ball graphics
        this.initBall()
        this.draw()

        // ball collision model
        this.shape = new cp.CircleShape(this.body, this.radius, cp.v(0, 0))
        this.shape.setElasticity(1.0)
        this.space.addShape(this.shape)
    },

    initBall:function() {
        this._draw = new cc.DrawNode()
        this.addChild(this._draw)
    },

    draw:function(x, y) {
        this._draw.clear()
        this._draw.drawDot(cc.p(x, y), this.radius, this.color)
    },

    move:function() {
        var x = this.body.getPos().x
        var y = this.body.getPos().y
        var winSize = cc.director.getWinSize()

        if (x > winSize.width) {
            this.body.setPos(cc.p(0, y))
            this.body.setVel(cp.v(this.body.getVel().x, 0))
        }
        // Reset to right-side of screen
        else if (x < 0) {
            this.body.setPos(cc.p(winSize.width, y))
            this.body.setVel(cp.v(this.body.getVel().x, 0))
        }

        this.draw(x, y)
    }
})