import zeroby 
sections = ["1"]

cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&c=index&a=bofang&kuid=965'
#cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513'


cartoon = zeroby.createCartoon(cartoonUrl)
cartoon.createDir()

for section in cartoon.sections:
    if section.name in sections:
        cartoonDirPath = cartoon.cartoonDirPath()
        sectionDirPath = section.sectionDirPath(cartoonDirPath)
        zeroby.downloadSection(section, sectionDirPath)