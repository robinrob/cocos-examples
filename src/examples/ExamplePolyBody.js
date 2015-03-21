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
            //    pos: cc.p(300, 300),
            //    radius: 50,
            //    coneLength: 100,
            //    segments: 20,
            //    mass: 10
            //}).addToSpace(this.space)

            rss.CircSegmentBody.create({
                pos: cc.p(300, 300),
                radius: 200,
                angle: 10,
                segments: 20,
                rotation: 90,
                extension: 20,
                mass: 10
            }).addToSpace(this.space)
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