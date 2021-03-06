# this is to put all processed data into database

import HTMLParser
import re

f = open("finaldata.txt",'r')
ff = open('final.txt','w')

escs = {}  # store all possible escapes
n=0  # count the numbers
while True:
    temp = f.readline().strip('\n').strip().split('     ')
    # temp contains all the info about the food

    
    if len(temp)<=1:
        print temp
        if temp and temp[0] == '':
            break
        continue
    n+=1
    print n

    m = re.findall(r'&[^;]{1,6};',temp[0]+temp[1])

    if not m:
        t = "     ".join(temp)
        t+='\n'
        ff.write(t)
    
        continue
    for i in m:
        if i not in escs:
            escs[i] = HTMLParser.HTMLParser().unescape(i)

    for i in range(2):
        for s in escs:
            if s in temp[i]:
                print temp[i]
                temp[i] = temp[i].replace(s,escs[s].encode('ascii','ignore'))
                print temp[i]

    t = "     ".join(temp)
    t+='\n'
    ff.write(t)
    

f.close()
ff.close()

print escs


