mrrobinsmith = {
    gravity: -350,
    groundHeight: 10
}

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

mrrobinsmith.g = {
    buttonOuterColor: mrrobinsmith.colors.orange,
    buttonInnerColor: mrrobinsmith.colors.green,
    buttonTextColor: mrrobinsmith.colors.orange
}

mrrobinsmith.tagOfLayer = {
    Animation: 1
};

mrrobinsmith.res = {
    fish_png  : "res/fish.png",
    fish_plist : "res/fish.plist"
}

mrrobinsmith.resources = [];
for (var i in mrrobinsmith.res) {
    mrrobinsmith.resources.push(mrrobinsmith.res[i]);
}