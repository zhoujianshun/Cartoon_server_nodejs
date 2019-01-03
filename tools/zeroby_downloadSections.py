import zeroby 
import zeroUrl

sections = ["1"]

cartoonUrl = zeroUrl.getCartoonUrl()

cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.createDir()
cartoon.downloadCover()

for section in cartoon.sections:
    if section.name in sections:
        cartoonDirPath = cartoon.cartoonDirPath()
        sectionDirPath = section.sectionDirPath(cartoonDirPath)
        zeroby.downloadSection(section, sectionDirPath)