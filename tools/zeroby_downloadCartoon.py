#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import zeroby
import zeroUrl

cartoonUrl = zeroUrl.getCartoonUrl()


cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.print_info()
cartoon.createDir()
cartoon.downloadCover()

for section in cartoon.sections:
    cartoonDirPath = cartoon.cartoonDirPath()
    sectionDirPath = section.sectionDirPath(cartoonDirPath)
    zeroby.downloadSection(section, sectionDirPath)