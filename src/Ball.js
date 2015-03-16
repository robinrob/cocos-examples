var Ball = CircBody.extend({
    _draw: null,

    ctor:function(pos, radius, mass, space) {
        cc.log("Ball.ctor ...")
        this._super(pos, radius, mass, space)

        this.setColor(cc.color(255, 0, 0, 255))

        this.init()
    },

    init: function() {
        this._super()

        this._draw = new cc.DrawNode()
        this.addChild(this._draw)
    },

    draw:function() {
        this._draw.clear()
        this._draw.drawDot(this.getPos(), this.radius, this.getColor())
    },

    update:function() {
        var winSize = cc.director.getWinSize()
        var x = this.getPos().x
        var y = this.getPos().y

        if (x > winSize.width) {
            this.setPos(cc.p(0, y))
            this.setVel(cp.v(this.getVel().x, 0))
        }
        // Reset to right-side of screen
        else if (x < 0) {
            this.setPos(cc.p(winSize.width, y))
            this.setVel(cp.v(this.getVel().x, 0))
        }

        this.draw()
    }
})