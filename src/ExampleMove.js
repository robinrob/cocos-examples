/* Example of moving a body around using keyboard controls */

var ExampleMove = {
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
            this._super()

            this.addChild(new ExampleMove.Layer())
        }
    })
}