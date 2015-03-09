rss = {
    gravity: -35,
    groundHeight: 10,

    toV: function(p) {
    return cp.v(p.x, p.y)
    }
}

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
    fish_png  : "res/fish.png",
    fish_plist : "res/fish.plist"
}

rss.resources = [];
for (var i in rss.res) {
    rss.resources.push(rss.res[i]);
}

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

var cfg = {
    width: {},
    height: {},
    mass: {}
}
rss.cfg = cfg

var width = {}
cfg.width = width
width.leg = 10
width.crotch = 5
width.arm = 5
width.armpit = 5
width.torso = width.leg + width.crotch
width.head = 20
width.man = rss.sum(width)

var height = {}
cfg.height = height
height.leg = 40
height.crotch = 5
height.arm = 30
height.torso = width.torso
height.neck = 5
height.head = width.head
height.man = rss.sum(height)

var mass = {}
cfg.mass = mass
mass.leg = 16
mass.arm = 6
mass.torso = 20
mass.head = 8
mass.man = rss.sum(mass)

var y = {}
cfg.y = y
y.shoulder = height.leg + height.torso