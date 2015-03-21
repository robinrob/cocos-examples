rss.StaticRectBody = rss._StaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        cc.log("StaticRectBody.init ...")
        this._super()

        if (rss.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.physics == rss.box2D) {
            this.initBox2D()
        }

        return this
    },
    
    initChipmunk: function() {
        cc.log("StaticRectBody.initChipmunk ...")
        // body
        this.body = new cp.StaticBody()
        this.body.setPos(this.getStartPos())

        // shape
        this.shape = new cp.BoxShape(this.body, this.size.width, this.size.height)
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
        this.body = world.CreateBody(bodyDef)
        body.CreateFixture(fixtureDef);
    }
})

rss.StaticRectBody.create = function(args) {
    return new rss.StaticRectBody(args).init()
}