/* Example of moving a body around using keyboard controls */

var ExampleGamepad = {
    Scene: BaseScene.extend({
        onEnter: function() {
            this._super(ExampleGamepad)

            var that = this
            window.addEventListener('gamepadconnected', function (e) {
                cc.log("CONNECTED")
                var gp = navigator.getGamepads()[e.gamepad.index];
                that.gamepad = gp
                cc.log("Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.")
            })

            window.addEventListener('gamepaddisconnected', function () {
                cc.log("DISCONNECTED")
            })

            this.addChild(new BaseLayer().init())

            this.scheduleUpdate()
        },

        buttonPressed: function(b) {
            if (typeof(b) == "object") {
                return b.pressed;
            }
            return b == 1.0;
        },

        update: function() {
            if (typeof(this.gamepad) != "undefined") {
                var that = this
                this.gamepad.buttons.forEach(function(btn, i) {
                    if (that.buttonPressed(btn)) {
                        cc.log("Button pressed: " + i)
                    }
                })
            }
        }
    })
}