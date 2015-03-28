var ExampleCircularMovement = ExampleScene.extend({
    ctor: function() {
        this._super()
    },

    init: function() {
        this._super()

        this.r.space = new cp.Space()

        this.r.layer = new this.Layer(this.r.space)
        this.addChild(this.r.layer)

        this.scheduleUpdate()

        return this
    },

    update: function(dt) {
        this.r.space.step(dt)

        this.getLayer().update(dt)
    },

    Layer: ExampleScene.Layer.extend({
        ctor: function(space) {
            this._super()

            this.r.space = space
            //this.r.space.gravity = cp.v(0, rss.gravity);

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);

            this.init()
        },

        init: function () {
            this._super()

            var box = rss.StaticRectBody.create({
                pos: rss.center(),
                size: cc.size(10, 10)
            }).addToSpace(this.r.space)

            this.item = CircFlyingObstacle.create({
                pos: rss.center(),
                size: cc.size(50, 50),
                mass: 50,
                radius: 200,
                angle: 90,
                rotation: 135,
                omega: 100
            }).addToSpace(this.r.space)

            this.r.space.addConstraints(rss.pivotJoint(box, this.item))

            return this
        },

        update: function(dt) {
            this.item.update(dt)
        }
    })
})

ExampleCircularMovement.create = function() {
    return new ExampleCircularMovement().init()
}