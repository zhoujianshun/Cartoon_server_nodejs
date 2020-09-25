import zeroby 
import os


import zeroConfigs

sections = []


cartoonUrl =  zeroConfigs.getCartoonUrl()

cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.createDir()
cartoonDirPath = cartoon.cartoonDirPath()
cartoon.downloadCover()

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