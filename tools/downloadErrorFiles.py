import  zeroby
import  os
import sys

path = sys.argv[1]
print(path)
# zeroby.redownloadErrorFile(path)
for dirpath,dirnames,filenames in os.walk(path):
    # print('-------------')
    # print(dirpath,)
    # print('-------------')
    # print(dirnames)
    # print('-------------')
    # print(filenames)
    for filename in filenames:
        if filename == 'error.txt':
            path = os.path.join(dirpath, filename)
            print(path)
            zeroby.redownloadErrorFile(path)