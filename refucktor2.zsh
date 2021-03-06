#!/usr/bin/env zsh

[[ $fpath = *dotfiles-base* ]] || fpath=($FUNCS_HOME $fpath)
autoload -U +X $fpath[1]/*(:t) 2> /dev/null
source $ZSHCOLORS_PATH

perl_all 's/rss\.add(?=\b)/rss\.p\.add/g' src '*.js'
sed_all 's/rss\.addX/rss\.p\.addX/g' src '*.js'
sed_all 's/rss\.addY/rss\.p\.addY/g' src '*.js'
perl_all 's/rss\.sub(?=\b)/rss\.p\.sub/g' src '*.js'
sed_all 's/rss\.subX/rss\.p\.subX/g' src '*.js'
sed_all 's/rss\.subY/rss\.p\.subY/g' src '*.js'
perl_all 's/rss\.mult(?=\b)/rss\.p\.mult/g' src '*.js'

sed_all 's/rss\.p.addW/rss\.s\.addW/g' src '*.js'
sed_all 's/rss\.p.addH/rss\.s\.addH/g' src '*.js'

sed_all 's/rss\.addW/rss\.s\.addW/g' src '*.js'
sed_all 's/rss\.addH/rss\.s\.addH/g' src '*.js'
sed_all 's/rss\.subW/rss\.s\.subW/g' src '*.js'
sed_all 's/rss\.subH/rss\.s\.subH/g' src '*.js'
sed_all 's/rss\.multS/rss\.s\.mult/g' src '*.js'

sed_all 's/rss\.size/rss\.winsize/g' src '*.js'
