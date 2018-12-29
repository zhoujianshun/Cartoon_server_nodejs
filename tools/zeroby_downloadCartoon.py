#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import zeroby

cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&c=index&a=bofang&kuid=965'
#cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513' #碧蓝

cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.createDir()

for section in cartoon.sections:
    cartoonDirPath = cartoon.cartoonDirPath()
    sectionDirPath = section.sectionDirPath(cartoonDirPath)
    zeroby.downloadSection(section, sectionDirPath)