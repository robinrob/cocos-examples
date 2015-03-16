var ExampleJoints = {
    Layer: BaseLayer.extend({
        chair: null,
        space: null,
        gameLayer: null,
        center: null,

        ctor: function (space) {
            this._super();
            this.space = space

            var winSize = cc.director.getWinSize()
            this.center = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            var box = this.constructBox()
            var slider = this.constructSlider()
            //var box = this.constructSlider()
            //slider.setPos(rss.add(box.getPos(), cc.p(50, 50)))

            //rss.pinJoint(this.space, box, slider)
            //rss.pivotJoint(this.space, box, slider)
            rss.slideJoint(this.space, box, slider)
            //rss.grooveJoint(this.space, box, slider)
        },

        constructBox: function() {
            var box = new StaticBody(this.center, cc.size(200, 200), this.space)
            box.setJointPs([cc.p(0, 50), cc.p(0, -50)])
            box.setGroup(1)
            return box
        },

        constructSlider: function() {
            var slider = new RectBody(rss.addY(this.center, 50), cc.size(50, 50), 50, this.space)
            slider.setJointP(cc.p(0, 0))
            slider.setGroup(1)
            return slider
        }
    }),

    Scene: cc.Scene.extend({
        space: null,

        onEnter:function () {
            cc.log("Scene.onEnter ...")
            this._super();

            this.space = new cp.Space();
            this.space.gravity = cp.v(0, rss.gravity);

            this.layer = new ExampleJoints.Layer(this.space);

            this.addChild(this.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.space.step(dt);

            this.layer.update();
        }
    })
}