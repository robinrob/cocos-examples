var ExampleCircularMovement = {
    Scene: BaseScene.extend({
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
        }
    }),

    Layer: BaseLayer.extend({
        ctor: function(space) {
            this._super()

            this.r.space = space
            this.r.space.damping = 1.0
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

            var range = rss.toRad(360)
            var offset = rss.toRad(135)
            this.item = CircFlyingObstacle.create({
                pos: rss.center(),
                size: cc.size(50, 50),
                mass: 1,
                radius: 200,
                range: range,
                offset: offset,
                omega: rss.toRad(100)
            }).addToSpace(this.r.space)

            this.r.space.addConstraints(rss.pivotJoint(box, this.item))
            this.r.space.addConstraints(rss.rotaryLimitJoint(box, this.item, offset, offset + range))

            return this
        },

        update: function(dt) {
            this.item.update(dt)
        }
    })
}