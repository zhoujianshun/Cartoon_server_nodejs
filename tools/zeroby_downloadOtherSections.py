import zeroby 
import os

sections = []

# cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&c=index&a=bofang&kuid=965'
cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513' #碧蓝

cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.createDir()
cartoonDirPath = cartoon.cartoonDirPath()

# for dirs in os.walk(cartoonDirPath):
#     print(dirs)

dirs = os.listdir(cartoonDirPath)
sections.extend(dirs)
# for dir in dirs:
#     print(dir)

for section in cartoon.sections:
    if not section.name in sections:
        sectionDirPath = section.sectionDirPath(cartoonDirPath)
        zeroby.downloadSection(section, sectionDirPath)