var ExampleTouch = {
    Layer: BaseLayer.extend({
        balls: null,
        space: null,

        ctor: function (space) {
            this._super();

            this.space = space

            this.init()
        },

        init: function () {
            this._super()

            this.balls = []

            var that = this
            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouch: that.onTouch
            })
            cc.eventManager.addListener(listener.clone, this)
        },

        onTouch:function(touch, event) {
            cc.log("Clicked!")
            var pos = touch.getLocation();
            //this.balls.push(new Ball(pos, 10, this.space))
            return true
        },

        update: function(dt) {
            this.balls.forEach(function(ball) {
                ball.move()
            })
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExampleTouch.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update(dt);
        }
    })
}