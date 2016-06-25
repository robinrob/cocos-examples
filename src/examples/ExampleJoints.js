var ExampleJoints = {
    Layer: BaseLayer.extend({
        ctor: function (space) {
            this._super(ExampleJoints);
            this.r.space = space

            var winSize = cc.director.getWinSize()
            rss.center() = cc.p(winSize.width / 2, winSize.height / 2)

            this.init()

            this._debugNode = new cc.PhysicsDebugNode(this.r.space);
            this._debugNode.setVisible(true);
            // Parallax ratio and offset
            this.addChild(this._debugNode, 10);
        },

        init: function () {
            this._super()

            Box.create(cc.p(this.MARGIN, 0), this.r.size, this.r.space)

            var box = this.constructBox()
            var slider = this.constructSlider()
            //var box = this.constructSlider()
            //slider.setPos(rss.p.add(box.getPos(), cc.p(50, 50)))

            //rss.pinJoint(this.r.space, box, slider)
            //rss.pivotJoint(this.r.space, box, slider)
            rss.slideJoint(this.r.space, box, slider)
            //rss.grooveJoint(this.r.space, box, slider)
        },

        constructBox: function() {
            var box = new StaticRectBody(rss.center(), cc.size(200, 200), this.r.space)
            box.setJointPs([cc.p(0, 50), cc.p(0, -50)])
            box.setGroup(1)
            return box
        },

        constructSlider: function() {
            var slider = new RectBody(rss.p.addY(rss.center(), 50), cc.size(50, 50), 50, this.r.space)
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

            this.r.space = new cp.Space();
            this.r.space.gravity = cp.v(0, rss.gravity);

            this.r.layer = new ExampleJoints.Layer(this.r.space);

            this.addChild(this.r.layer);

            this.scheduleUpdate();
        },

        update: function(dt) {
            this.r.space.step(dt);

            this.r.layer.update();
        }
    })
}