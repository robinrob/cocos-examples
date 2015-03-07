mrrobinsmith = {}

mrrobinsmith.colors = {
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

mrrobinsmith.tileColors = [
    mrrobinsmith.colors.yellow,
    mrrobinsmith.colors.green,
    mrrobinsmith.colors.purple,
    mrrobinsmith.colors.pink,
    mrrobinsmith.colors.orange,
    mrrobinsmith.colors.maroon,
    mrrobinsmith.colors.brown,
    mrrobinsmith.colors.blue
]

mrrobinsmith.g = {
    buttonOuterColor: mrrobinsmith.colors.orange,
    buttonInnerColor: mrrobinsmith.colors.green,
    buttonTextColor: mrrobinsmith.colors.orange
}

mrrobinsmith.res = {
    fish_png  : "res/fish.png",
    fish_plist : "res/fish.plist"
}

mrrobinsmith.resources = [];
for (var i in mrrobinsmith.res) {
    mrrobinsmith.resources.push(mrrobinsmith.res[i]);
}