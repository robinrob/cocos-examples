var Car = rss.CompositeDynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(rss.car.width.total, rss.car.height.total)
        this._super(args)
    },

    init: function() {
        cc.log("rss.man.init...")
        this._super()

        // wheels
        var wheel1 = this._constructWheel(
            this.worldX(-1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )
        wheel1.setJointP(cc.p(0, 0))

        var wheel2 = this._constructWheel(
            this.worldX(+1 * (rss.car.width.chassis + rss.car.width.wheel) / 2),
            this.worldY(rss.car.height.wheel / 2)
        )
        wheel2.setJointP(cc.p(0, 0))

        var chassis = this._constructChassis(
            this.worldX(0),
            this.worldY(rss.car.height.wheel / 2)
        )

        this.joinParts(wheel1, chassis)
        this.joinParts(wheel2, chassis)

        return this
    },

    _constructWheel: function(x, y) {
        var part = new rss.CircBody.create({
                pos: cc.p(x, y),
                radius: rss.car.width.wheel,
                mass: rss.car.mass.wheel,
                color: rss.colors.green
            }
        )
        this.addChildComp(part)

        return part
    },

    _constructChassis: function(x, y) {
        var part = this._constructBox(
            cc.p(x, y),
            cc.size(rss.car.width.chassis, rss.car.height.chassis),
            rss.car.mass.chassis,
            rss.colors.red
        )
        this.addChildComp(part)
        return part
    },

    _constructBox: function(pos, size, mass, color) {
        var part = rss.RectBody.create({
                pos: pos,
                size: size,
                mass: mass,
                color: color
            }
        )

        return part
    },

    joinParts: function(o1, o2) {
        this.addConstraints(rss.pivotJoint(o1, o2))
    },

    worldX: function(x) {
        return this.r.origin.x + x
    },

    worldY: function(y) {
        return this.r.origin.y + y
    },

    worldCoords: function(x, y) {
        return cc.p(this.r.origin.x + x, this.r.origin.y + y)
    },

    update: function() {
        this.draw()
        var p = this.getPos()
        var x = p.x
        var y = p.y

        if (x > rss.width()) {
            this.setPos(0, y)
        }
        else if (x < 0) {
            this.setPos(rss.width(), y)
        }
    }
})

Car.create = function(args) {
    return new Car(args).init()
}