var CircBody = DynamicBody.extend({

    ctor: function(pos, size, mass, space, color) {
        this._super(pos, size, mass, space, color)

        this.radius = this.size.width / 2

        this.init()
    },

    init:function() {
        this._super()

        var angle = Math.random() * 360

        // body
        this.body = new cp.Body(this.mass, cp.momentForCircle(this.mass, 0, this.radius, cp.v(0,0)));
        this.space.addBody(this.body);
        this.body.setPos(this.startV)

        // shape
        var shape = new cp.CircleShape(this.body, this.radius, cp.v(0, 0))
        shape = this.space.addShape(shape)
        shape.setElasticity(0.0)
    }
})