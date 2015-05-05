var ExampleAnimation = {
    Layer: BaseLayer.extend({
        ctor: function () {
            cc.log("AnimationLayer.ctor ...")
            this._super();

            this.init()
        },

        init: function () {
            cc.log("AnimationLayer.init ...")
            this._super()

            this.addChild(new FishAnimation(), 10)
        }
    }),

    Scene: BaseScene.extend({
        onEnter:function () {
            this._super();

            this.addChild(new ExampleAnimation.Layer());
        }
    })
}