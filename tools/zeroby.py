#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re  # 正则
import urllib.parse  # url解析
import requests  # python3 -m pip install requests
from bs4 import BeautifulSoup  # python3 -m pip install BeautifulSoup4
# 还需要安装lxml。 pip install lxml
# https://blog.csdn.net/Ka_Ka314/article/details/80999803
# https://www.cnblogs.com/chimeiwangliang/p/8649003.html

import os  # 路径 https://www.cnblogs.com/yanglang/p/7610838.html
import time

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36"}

s = requests.Session()


class Cartoon(object):
    def __init__(self, name, sections):
        index = name.index("】")
        print(index)
        self.name = name[0 : index + 1]
        self.sections = sections

    def print_info(self):
        print("cartoon name: %s, sections count: %i, cover: %s" %
              (self.name, len(self.sections), self.coverUrl))

    def createDir(self):
        path = self.cartoonDirPath()
        if os.path.exists(path):
            print(path)
        else:
            os.makedirs(path)

    def cartoonDirPath(self):
        cwd = os.getcwd()
        path = os.path.join(cwd, 'store', self.name)
        return path

    @property
    def coverUrl(self):
        return self._coverUrl
    
    @coverUrl.setter
    def coverUrl(self, value):
        self._coverUrl = value

    def downloadCover(self):
        if self.coverUrl:
            dirPath = self.cartoonDirPath()
            targetPath = os.path.join(dirPath,'cover.jpg')
            downloadFile(self.coverUrl, targetPath)



class Section(object):
    def __init__(self, name, url):
        self.name = name
        self.url = url

    def print_info(self):
        print("setion name:%s, setionu rl: %s" %
              (self.name, self.url))  # 查标签的href值

    def sectionDirPath(self, rootPath):
        path = os.path.join(rootPath, self.name)
        return path


####################################################

def createCartoon(url):
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname
    print(hostname)

    respose = s.get(url, headers=headers)
    #respose = s.get(url)

    # print(respose.text)
    # print(respose.status_code)# 响应的状态码
    # print(respose.content)  #返回字节信息
    # print(respose.text)  #返回文本内容
    # urls=re.findall(r'class="uk-button uk-button-default".*?href="(.*?)"',respose.text,re.S)  #re.S 把文本信息转换成1行匹配

    # print(urls)

    soup = BeautifulSoup(respose.text, 'lxml')
    respose.close()
    print(soup.title)
    cartoonName = soup.title.string
    print("cartoonName: "+cartoonName)

    tags = soup.find_all(
        attrs={"class": "uk-button uk-button-default"})  # 也可以通过字典的方式查找

    # 处理章节
    sections = []
    for tag in tags:
        setionUrl = urllib.parse.urljoin(url, tag['href'])
        setionName = tag.string
        section = Section(setionName, setionUrl)
        # section.print_info()
        sections.append(section)

    cartoon = Cartoon(cartoonName, sections)

    # 封面
    tag2 = soup.find(attrs={"class": "bofangwrap rootcate uk-margin-top uk-grid-collapse"})
    coverUrl = tag2.div.div.div.img["src"]
    # print(coverUrl)
    cartoon.coverUrl = coverUrl

    
    return cartoon


def downloadSection(section, sectionDirPath):

    if os.path.exists(sectionDirPath):
        print(sectionDirPath)
    else:
        print(sectionDirPath)
        os.mkdir(sectionDirPath)

    errorFilePath = os.path.join(sectionDirPath, 'error.txt')
    if os.path.exists(errorFilePath):
        os.remove(errorFilePath)

    response = s.get(section.url, headers=headers)
    #response =s.get(section.url )
    soup = BeautifulSoup(response.text, 'lxml')
    tags = soup.find_all(attrs={"class": "uk-text-center mb0"})
    response.close()
    for tag in tags:
        # time.sleep(1)
        index = tag.div.string
        url = tag.img["src"]

        [dirname, filename] = os.path.split(url)  # 文件名
        # print(dirname,"\n",filename)
        # [fname,fename]=os.path.splitext(url)
        # print(fname,"\n",fename) # 分离扩展名
        

        filePath = os.path.join(sectionDirPath, filename)
        try:
            print("开始下载第%s章, 第%s页" % (section.name, filename))
            downloadFile(url, filePath)
        except Exception as ex:
            print(ex)
            print("【错误】下载第%s章, 第%s页, 当前图片无法下载:%s" %
                  (section.name, filename, url))
            
            with open(errorFilePath, 'a+') as file:
                file.write(url + '\n')
                file.close()
            continue

    print("第%s章下载完成" % (section.name))


def downloadFile(url, targetPath, timeout=30):
    pic = s.get(url, headers=headers, timeout=timeout)
    if pic.status_code == 200:
        with open(targetPath, 'wb') as file:
            file.write(pic.content)
            file.close()
        pic.close()


# 解析目录中的error.txt 文件，重新下载其中的链接
import shutil
def redownloadErrorFile(errorFilePath):
    # s.get("http://www.zerobyw.com", headers=headers, timeout=30)
    dir = os.path.dirname(errorFilePath)
    print(dir)

    if os.path.exists(errorFilePath):
        f = open(errorFilePath,"r",encoding="utf-8")
        newFilePath =  errorFilePath + '.new'
        f_w = open( newFilePath, "w",encoding="utf-8")
        hasError = False
        for line in f:
            print("开始下载:%s" % (line))
            url = line.strip()
            [dirname, filename] = os.path.split(url)
            filePath = os.path.join(dir, filename)
            print(filePath)
            try:
                downloadFile(url, filePath)
            except Exception as ex:
                print(ex)
                hasError = True
                f_w.write(line)
                continue     
        f.close()
        f_w.close()
        
        if hasError :
            shutil.move(newFilePath, errorFilePath)
        else:
            os.remove(errorFilePath)
            os.remove(newFilePath)
            
    else:
        print('file: %s, not exits' % filePath)


#s = requests.Session()
# cartoonUrl = 'http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513'
# cartoon = createCartoon(cartoonUrl)
# cartoon.createDir()
# cartoon.print_info()


# 测试下载章节
# section = cartoon.sections[1]
# cartoonDirPath = cartoon.cartoonDirPath()
# sectionDirPath = section.sectionDirPath(cartoonDirPath)
# downloadSection(section, sectionDirPath)
# section.print_info()


# # 测试下载文件
# s.get(cartoonUrl, headers = headers)
# #s.get(cartoonUrl)
# downloadFile('http://mhua.zerobyw.com/manhua/GrandBlue/1-4/010.jpg', './010.jpg')


# 开始下载
# for section in cartoon.sections:
#     cartoonDirPath = cartoon.cartoonDirPath()
#     sectionDirPath = section.sectionDirPath(cartoonDirPath)
#     downloadSection(section, sectionDirPath)