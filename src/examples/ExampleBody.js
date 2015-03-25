var ExampleBody = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super();
            this.r.space = space

            switch(rss.physics) {
                case rss.chipmunk:
                    rss.Box.create({pos: cc.p(), size: this.r.size}).addToSpace(this.r.space)
                    this.debugNodeChipmunk()
                    break
                case rss.box2D:
                    this.debugNodeBox2D()
                    break
            }

            this.init()
        },

        debugNodeChipmunk: function() {
            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
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
            this.r.space.SetDebugDraw(debugDraw);
            this.r.space.DrawDebugData();
        },

        init: function () {
            this._super()

            var pos = cc.p(this.r.center.x, this.r.center.y + 100)

            this.ball = Ball.create({pos: pos, radius: 10, mass: rss.ball.mass}).addToSpace(this.r.space)
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
                    this.r.space = new cp.Space();
                    this.r.space.gravity = cp.v(0, rss.gravity);
                    break;
                case rss.box2D:
                    this.r.space = new Box2D.Dynamics.b2World(rss.gravity, true);
                    this.r.space.SetContinuousPhysics(true);
                    this.r.space.gravity = rss.gravity
                    break;
            }

            this.r.layer = new ExampleBody.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            switch(rss.physics) {
                case rss.chipmunk:
                    this.r.space.step(dt);
                    break;
                case rss.box2D:
                    this.r.space.Step(dt, 8, 3)
                    break;
            }

            this.r.layer.update();
        }
    })
}