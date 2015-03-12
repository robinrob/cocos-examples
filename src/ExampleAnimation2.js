var ExampleAnimation2 = {
    Layer: BaseLayer.extend({
        ctor: function () {
            cc.log("AnimationLayer.ctor ...")
            this._super();

            this.init()
        },

        init: function () {
            cc.log("AnimationLayer.init ...")
            this._super()

            this.addChild(new FishAnimation())
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleAnimation2.Layer());
        }
    })
}