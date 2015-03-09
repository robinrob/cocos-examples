var Example = {
    Layer: BaseLayer.extend({
        ctor: function () {
            this._super();

            this.init()
        },

        init: function () {
            this._super()
        }
    }),

    Scene: cc.Scene.extend({
        onEnter:function () {
            this.addChild(new Example.Layer())
        }
    })
}