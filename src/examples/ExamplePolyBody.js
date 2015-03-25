var ExamplePolyBody = {
    Layer: BaseLayer.extend({
        ctor: function(space) {
            this._super();
            this.space = space

            rss.Box.create({pos: cc.p(), size: this.size}).addToSpace(this.space)
            this.debugNodeChipmunk()

            this.init()
        },

        debugNodeChipmunk: function() {
            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            //rss.ConeBody.create({
            //    pos: rss.subX(this.center, 100),
            //    length: 100,
            //    radius: 20,
            //    segments: 20,
            //    rotation: 90,
            //    mass: 10
            //}).addToSpace(this.space)

            this.addChild(rss.CircSegmentBody.create({
                pos: this.center,
                radius: 200,
                angle: 90,
                segments: 1,
                rotation: 120,
                mass: 10,
                length: 1.0
            }).addToSpace(this.space).draw())
        },

        update: function() {
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExamplePolyBody.Layer(this.space);

            this.addChild(this.layer);

            //this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update();
        }
    })
}