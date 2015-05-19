var Man2 = Man.extend({
    ctor: function(args) {
        this._super(args)
    },

    update: function(dt) {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dix = 0.0
        var diy = 0.0

        if ((rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]) && y <= winSize.height) {
            //y += 10
            diy = +1 * rss.man.acc * rss.man.mass.total * dt
        }
        if ((rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]) && y >= 0) {
            //y -= 10
            diy = -1 * rss.man.acc * rss.man.mass.total * dt
        }
        if ((rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]) && x >= 0) {
            //x -= 10
            dix = -1 * rss.man.acc * rss.man.mass.total * dt
        }
        if ((rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]) && x <= winSize.width) {
            //x += 10
            dix = +1 * rss.man.acc * rss.man.mass.total * dt
        }

        if (x > winSize.width) {
            this.setPos(0, y)
        }
        else if (x < 0) {
            this.setPos(winSize.width, y)
        }

        this.applyImpulse(cc.p(dix, diy))
    }
})

Man2.create = function(args) {
    return new Man2(args).init()
}