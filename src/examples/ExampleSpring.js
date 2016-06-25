var ExampleSpring = {
    Scene: BaseScene.extend({
        ctor: function () {
            this._super()
        },

        init: function () {
            this._super(ExampleSpring)

            this.r.space = new cp.Space()
            //this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new this.Layer(this.r.space)
            this.addChild(this.r.layer)

            this.scheduleUpdate()

            return this
        },

        update: function (dt) {
            this.r.space.step(dt)

            this.getLayer().update(dt)
        }
    }),

    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super()

            this.r.space = space
            this.r.space.gravity = cp.v(0, rss.gravity);

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);

            this.init()
        },

        init: function () {
            this._super()

            this.item = Spring.create({
                pos: rss.subY(rss.center(), 200),
                size: cc.size(50, 50),
                mass: 5,
                length: 400
            }).addToSpace(this.r.space)

            return this
        },

        update: function (dt) {
            this.item.update(dt)
        }
    })
}