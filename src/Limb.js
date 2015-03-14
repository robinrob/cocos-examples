var Limb = Part.extend({

    ctor: function(pos, size, mass, space, color) {
        this._super(pos, size, mass, space, color)

        this.init()
    },

    init: function() {
        this._super()

        // body
        this.body = new cp.Body(this.mass, cp.momentForBox(this.mass, this.size.width, this.size.height))
        this.space.addBody(this.body)
        this.body.setPos(this.startV)

        // shape
        var shape = new cp.BoxShape(this.body, this.size.width, this.size.height)
        shape.setElasticity(0);
        this.shape = this.space.addShape(shape)
    }
})