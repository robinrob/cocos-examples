var Man2 = Man.extend({
    ctor: function(position, space) {
        this._super(position, space)
    },

    applyDeltaV: function(dvx, dvy) {
        //var scale = this.getMass() / this.torso.getMass()
        //this.torso.applyDeltaV(dvx * scale, dvy * scale)
        this.limbs.forEach(function(limb) {
            limb.applyDeltaV(dvx, dvy)
        })
    },

    update: function(dt) {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dvx = 0.0
        var dvy = 0.0

        if ((rss.keys[cc.KEY.w] || rss.keys[cc.KEY.up]) && y <= winSize.height) {
            //y += 10
            dvy = rss.exampleMove.impulse / dt
        }
        if ((rss.keys[cc.KEY.s] || rss.keys[cc.KEY.down]) && y >= 0) {
            //y -= 10
            dvy = -1 * rss.exampleMove.impulse / dt
        }
        if ((rss.keys[cc.KEY.a] || rss.keys[cc.KEY.left]) && x >= 0) {
            //x -= 10
            dvx = -1 * rss.exampleMove.impulse / dt
        }
        if ((rss.keys[cc.KEY.d] || rss.keys[cc.KEY.right]) && x <= winSize.width) {
            //x += 10
            dvx = 1 * rss.exampleMove.impulse / dt
        }

        if (x > winSize.width) {
            this.setPos(0, y)
        }
        else if (x < 0) {
            this.setPos(winSize.width, y)
        }

        this.applyDeltaV(dvx, dvy)
    }
})