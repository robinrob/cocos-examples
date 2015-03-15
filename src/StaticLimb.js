var StaticLimb = StaticPart.extend({

    ctor: function(pos, size, space, color) {
        this._super(pos, size, space, color)

        this.init()
    },

    init: function() {
        this._super()

        // body
        this.body = new cp.StaticBody()
        this.body.setPos(this.pos)

        // shape
        var shape = new cp.BoxShape(this.body, this.size.width, this.size.height)
        this.shape = this.space.addStaticShape(shape)
    }
})