var ExampleTouch = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();

            this.r.space = space

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);

            this.init()
        },

        init: function () {
            this._super()

            this.balls = []

            Box.create(cc.p(this.MARGIN, 0), this.r.size, this.r.space)

            var that = this
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    var pos = touch.getLocation();
                    var ball = new Ball(pos, 10, 10, that.space)
                    that.balls.push(ball)
                    that.addChild(ball)
                }
            }, this)
        },

        update: function() {
            this.balls.forEach(function(ball) {
                ball.update()
            })
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExampleTouch.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update();
        }
    })
}