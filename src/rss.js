var rss = rss || {};

/* Functions */
rss.toV = function(p) {
    return cp.v(p.x, p.y)
}

rss.sum = function(obj) {
    var total = 0
    for (var i in obj) {
        total += obj[i]
    }
    return total
}

rss.gravity = -35
rss.groundHeight = 10

rss.exampleMan = {}
rss.exampleMan.impulse = 5
rss.exampleMan.gravity = -350

rss.exampleCar = {}
rss.exampleCar.impulse = 5
rss.exampleCar.gravity = -350

rss.exampleSpaceship = {}
rss.exampleSpaceship.impulse = 5
rss.exampleSpaceship.gravity = 0

rss.colors = {
    yellow: new cc.color(255, 255, 0, 255),
    green: new cc.color(0, 255, 0, 255),
    purple: new cc.color(174, 0, 255, 255),
    pink: new cc.color(255, 0, 255, 255),
    orange: new cc.color(255, 78, 0, 255),
    maroon: new cc.color(172, 6, 84, 255),
    brown: new cc.color(145, 58, 6, 255),
    blue: new cc.color(6, 87, 234, 255),
    black: new cc.color(0, 0, 0, 255),
    white: new cc.color(255, 255, 255, 255)
}

rss.g = {
    buttonOuterColor: rss.colors.orange,
    buttonInnerColor: rss.colors.green,
    buttonTextColor: rss.colors.orange
}

rss.tagOfLayer = {
    Animation: 1
};

rss.res = {
    fish_png  : "res/fish/fish.png",
    fish_plist : "res/fish/fish.plist",
    spaceship_png  : "res/spaceship/spaceship-0001-default.png",
    spaceship_plist : "res/spaceship/spaceship-0001-default.plist"
}

// Resources for pre-loading
rss.resources = [];
for (var i in rss.res) {
    rss.resources.push(rss.res[i]);
}

// Used by keyboard listeners
rss.keys = []


/* Object configs */

// Ball
var ball = {}
rss.ball = ball

ball.mass = 100


// Man
var man = {}
rss.man = man

var width = {}
man.width = width
width.leg = 10
width.crotch = 5
width.arm = 5
width.armpit = 5
width.torso = 2 * width.leg + width.crotch
width.head = 20
width.total = rss.sum(width)

var height = {}
man.height = height
height.leg = 40
height.crotch = 5
height.arm = 30
height.torso = width.torso
height.neck = 5
height.head = width.head
height.total = rss.sum(height)

var mass = {}
man.mass = mass
mass.leg = 16
mass.arm = 6
mass.torso = 20
mass.head = 8
mass.total = rss.sum(mass)

var y = {}
man.y = y
y.shoulder = height.leg + height.torso

// Car
var car = {}
rss.car = car

var width = {}
car.width = width
width.wheel = 30
width.bonnet = 20
width.body = 60
width.chassis = width.bonnet + width.body
width.total = width.chassis

var height = {}
car.height = height
height.wheel = width.wheel
height.bonnet = 20
height.body = 40
height.chassis = 10

var mass = {}
car.mass = mass
mass.wheel = 10
mass.bonnet = 20
mass.body = 40
mass.chassis = 20