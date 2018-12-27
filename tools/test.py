import re #正则
import urllib.parse # url解析
import requests  # python3 -m pip install requests
from bs4 import BeautifulSoup

import os # 路径 https://www.cnblogs.com/yanglang/p/7610838.html


class Cartoon(object):
    def __init__(self, name, sections):
        self.name = name
        self.sections = sections

    def print_info(self):
        print("cartoon name: %s, sections count: %i" % (self.name, len(self.sections)))
    
    def createDir(self):
        cwd=os.getcwd()
        path = cwd + "/" + self.name
        print(cwd)
       
        if os.path.exists(path):
            print(path)
        else:
            os.mkdir(path)
    def cartoonDirPath(self):
        cwd=os.getcwd()
        path = cwd + "/" + self.name
        return path

class Section(object):
    def __init__(self, name, url):
        self.name = name
        self.url = url

    def print_info(self):
        print("setion name:%s, setionu rl: %s" % (self.name, self.url))#查标签的href值

    def sectionDirPath(self, rootPath):
        return rootPath + "/" + self.name

def createCartoon(url):   
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname
    print(hostname)

    respose=requests.get(url)

    # print(respose.text)
    # print(respose.status_code)# 响应的状态码
    # print(respose.content)  #返回字节信息
    # print(respose.text)  #返回文本内容
    # urls=re.findall(r'class="uk-button uk-button-default".*?href="(.*?)"',respose.text,re.S)  #re.S 把文本信息转换成1行匹配

    # print(urls)

    soup = BeautifulSoup(respose.text,'lxml')
    print(soup.title)
    cartoonName = soup.title.string
    print("cartoonName: "+cartoonName)

    tags = soup.find_all(attrs={"class": "uk-button uk-button-default"})  #也可以通过字典的方式查找

    # 处理章节
    sections = []
    for tag in tags:
        setionUrl = urllib.parse.urljoin(url, tag['href'])
        setionName = tag.string
        section = Section(setionName, setionUrl)
        #section.print_info()
        sections.append(section)

    return Cartoon(cartoonName, sections)



def downloadSection(section, sectionDirPath):
    if os.path.exists(sectionDirPath):
        print(sectionDirPath)
    else:
        os.mkdir(sectionDirPath)

    response =requests.get(section.url)
    soup = BeautifulSoup(response.text,'lxml')
    tags = soup.find_all(attrs={"class": "uk-text-center mb0"})
    for tag in tags:
        index = tag.div.string
        url = tag.img["src"]
    
        [dirname,filename]=os.path.split(url) # 文件名
        #print(dirname,"\n",filename) 
        # [fname,fename]=os.path.splitext(url)
        # print(fname,"\n",fename) # 分离扩展名

        filePath = sectionDirPath + '/' + filename
        try:
            print("开始下载第%s章, 第%s页" % (section.name, filename))
            pic = requests.get(url, timeout = 30)
            with open(filePath, 'wb') as file:
                file.write(pic.content)
        except  Exception as ex:
            print("【错误】下载第%s章, 第%s页, 当前图片无法下载:%s" % (section.name, filename, url))
            continue

    print("第%s章下载完成" % (section.name))
        
        


cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513'
cartoon = createCartoon(cartoonUrl)
cartoon.createDir()
#cartoon.print_info()

# section = cartoon.sections[0]
# section.print_info()

for section in cartoon.sections:
    cartoonDirPath = cartoon.cartoonDirPath()
    sectionDirPath = section.sectionDirPath(cartoonDirPath)
    downloadSection(section, sectionDirPath)