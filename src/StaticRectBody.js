rss.StaticRectBody = rss.StaticBody.extend({
    ctor: function(pos, size, space) {
        this._super(pos, size, space)

        this.init()
    },

    init: function() {
        this._super()

        if (rss.physics == rss.chipmunk) {
            this.initChipmunk()
        }
        else if (rss.physics == rss.box2D) {
            this.initBox2D()
        }
    },
    
    initChipmunk: function() {
        // body
        this.body = new cp.StaticBody()
        this.body.setPos(this.getStartPos())

        // shape
        var shape = new cp.BoxShape(this.body, this.size.width, this.size.height)
        this.shape = this.space.addStaticShape(shape)
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