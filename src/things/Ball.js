var Ball = rss.CircBody.extend({
    ctor:function(args) {
        cc.log("Ball.ctor ...")
        this._super(args)

        this.setColor(cc.color(255, 0, 0, 255))
    },

    init: function() {
        this._super()

        this.r.shape.setElasticity(1.0)

        this._draw = new cc.DrawNode()
        this.addChild(this._draw)

        return this
    },

    draw:function() {
        this._draw.clear()
        this._draw.drawDot(this.getPos(), this.r.radius, this.getColor())
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

Ball.create = function(args) {
    return new Ball(args).init()
}