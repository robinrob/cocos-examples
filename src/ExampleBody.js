var ExampleBody = {
    Layer: BaseLayer.extend({
        space: null,

        ctor: function (space) {
            this._super();
            this.space = space

            var winSize = cc.director.getWinSize()
            this.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            switch(rss.physics) {
                case rss.chipmunk:
                    new Box(cc.p(this.MARGIN, 0), this.size, this.THICKNESS, this.space)
                    this.debugNodeChipmunk()
                    break
                case rss.box2D:
                    //this.debugNodeBox2D()
                    break
            }
        },

        debugNodeChipmunk: function() {
            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        debugNodeBox2D: function() {
            var debugDraw = new Box2D.Dynamics.b2DebugDraw();
            debugDraw.SetSprite(document.getElementById("test").getContext("2d")); // test is the id of another canvas which debugdraw works on
            debugDraw.SetDrawScale(30.0);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
            this.space.SetDebugDraw(debugDraw);
            this.space.DrawDebugData();
        },

        init: function () {
            this._super()

            var pos = cc.p(this.center.x, this.center.y + 100)
            this.ball = new Ball(pos, 10, rss.ball.mass, this.space)
            this.addChild(this.ball)
        },

        update: function() {
            this.ball.update()
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            switch(rss.physics) {
                case rss.chipmunk:
                    this.space = new cp.Space();
                    this.space.gravity = cp.v(0, rss.gravity);
                    break;
                case rss.box2D:
                    this.space = new Box2D.Dynamics.b2World(rss.gravity, true);
                    this.space.SetContinuousPhysics(true);
                    this.space.gravity = rss.gravity
                    break;
            }

            this.layer = new ExampleBody.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            switch(rss.physics) {
                case rss.chipmunk:
                    this.space.step(dt);
                    break;
                case rss.box2D:
                    this.space.Step(dt, 8, 3)
                    break;
            }

            this.layer.update();
        }
    })
}