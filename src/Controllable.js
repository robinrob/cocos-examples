var Controllable = cc.Node.extend({
    ctor: function() {
        this._super()
    },

    init: function() {
        this._super()
    },

    applyDeltaV: function (dvx, dvy) {
        this.body.applyImpulse(cp.v(dvx, dvy), cp.v(0, 0))
    },

    update: function (dt) {
        var p = this.body.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dvx = 0.0
        var dvy = 0.0

        if ((rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]) && y <= winSize.height) {
            //y += 10
            dvy = rss.exampleMan.impulse / dt
        }
        if ((rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]) && y >= 0) {
            //y -= 10
            dvy = -1 * rss.exampleMan.impulse / dt
        }
        if ((rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]) && x >= 0) {
            //x -= 10
            dvx = -1 * rss.exampleMan.impulse / dt
        }
        if ((rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]) && x <= winSize.width) {
            //x += 10
            dvx = 1 * rss.exampleMan.impulse / dt
        }

        this.applyDeltaV(dvx, dvy)
    }
})