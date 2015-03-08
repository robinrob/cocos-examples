var Ball = cc.Node.extend({
    radius: null,
    _draw: null,
    body: null,
    shape: null,
    sprite: null,
    startPos: null,

    ctor:function(position, radius, space, draw) {
        cc.log("Ball.ctor ...")

        this._super();

        this.radius = radius

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
        this.body = new cp.Body(10, cp.momentForCircle(10, 0, this.radius, cp.v(0,0)));
        this.body.p = cc.p(this.startPos.x, this.startPos.y);
        this.body.setAngle(angle)
        this.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));//run speed
        this.space.addBody(this.body);

        //ball graphics
        this.initBall()
        this.draw()

        // ball collision model
        this.shape = new cp.CircleShape(this.body, this.radius, cp.v(0,0))
        this.shape.setElasticity(0.8)
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

        this.draw(x, y)
    }
})