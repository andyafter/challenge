import HTMLParser
import cgi
import urllib
import urllib2
import random

# this script is to put all the data from final.txt

#noticing that you will only have to use this script once and only once

# this is a dangerous script


f = open('final.txt','r')

iden = random.randint(100000000,1000000000)
#iden = 338934537

url = "http://127.0.0.1:1337/createFood?"

n=0  
while True:
    temp = f.readline()
    if not temp:
        break
    
    temp = temp.strip('\n').strip().split('     ')
    print temp


    # first we create a sample test and insert it into the database

    req ={}
    req["name"] = temp[0].strip()
    req["company"] = temp[1].strip()
    req["nutrition"] = ";".join(temp[2:])
    req["id"] = str(iden+n)
    
    n+=1

    print n
    print req
    en = urllib.urlencode(req)
    print en

    res = urllib2.urlopen(url+en)


f.close()
