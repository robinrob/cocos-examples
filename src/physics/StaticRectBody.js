rss.StaticRectBody = rss.StaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        cc.log("StaticRectBody.init ...")
        this._super()

        if (rss.config.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.config.physics == rss.box2D) {
            this.initBox2D()
        }

        return this
    },
    
    initChipmunk: function() {
        //cc.log("StaticRectBody.initChipmunk ...")
        // body
        this.r.body = new cp.StaticBody()
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.shape = new cp.BoxShape(this.r.body, this.r.size.width, this.r.size.height)
    },
    
    initBox2D: function() {
        var fixtureDef = new  Box2D.Dynamics.b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        fixtureDef.shape.SetAsBox(0.5*width/worldScale,0.5*height/worldScale);
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        if(isDynamic){
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }
        else{
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        }
        bodyDef.position.Set(posX/worldScale,posY/worldScale);
        var userSprite = cc.Sprite.create(rss.res.fish_png);
        this.addChild(userSprite, 0);
        userSprite.setPosition(posX,posY);
        bodyDef.userData = {
            type: type,
            asset: userSprite
        }
        this.r.body = world.CreateBody(bodyDef)
        body.CreateFixture(fixtureDef);
    },

    draw: function(drawNode, col) {
        var col = col || this.getColor() || rss.colors.white
        drawNode.drawRect(
            cc.p(-this.getWidth() / 2, -this.getHeight() / 2),
            cc.p(this.getWidth() / 2, this.getHeight() / 2),
            rss.setAlpha(col, 255),
            2,
            rss.setAlpha(col, 255)
        )
        //drawNode.setPosition(this.getPos())
        //drawNode.setAnchorPoint(0.5, 0.5)
        //drawNode.setRotation(-1 * rss.toDeg(this.getAngle()))
    }
})

rss.StaticRectBody.create = function(args) {
    return new rss.StaticRectBody(args).init()
}