import re
import requests

respose=requests.get('http://www.zerobyw.com/plugin.php?id=jameson_manhua&a=bofang&kuid=513')
# print(respose.status_code)# 响应的状态码
# print(respose.content)  #返回字节信息
# print(respose.text)  #返回文本内容
urls=re.findall(r'class="uk-button uk-button-default".*?href="(.*?)"',respose.text,re.S)  #re.S 把文本信息转换成1行匹配

print(urls)