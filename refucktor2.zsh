#!/usr/bin/env zsh

sed_all 's/rss\.add(?=\b)/rss\.p\.add/g' src '*.js'
sed_all 's/rss\.addX/rss\.p\.addX/g' src '*.js'
sed_all 's/rss\.addY/rss\.p\.addY/g' src '*.js'
sed_all 's/rss\.sub(?=\b)/rss\.p\.sub/g' src '*.js'
sed_all 's/rss\.mult(?=b)/rss\.p\.mult/g' src '*.js'

sed_all 's/rss\.p.addW/rss\.s\.addW/g' src '*.js'
sed_all 's/rss\.p.addH/rss\.s\.addH/g' src '*.js'

sed_all 's/rss\.addW/rss\.s\.addW/g' src '*.js'
sed_all 's/rss\.addH/rss\.s\.addH/g' src '*.js'
sed_all 's/rss\.subW/rss\.s\.subW/g' src '*.js'
sed_all 's/rss\.subH/rss\.s\.subH/g' src '*.js'
sed_all 's/rss\.multS/rss\.s\.mult/g' src '*.js'
