import HTMLParser
import cgi
import urllib

f = open('final.txt','r')

n=0
while True:
    temp = f.readline()
    if not temp:
        break
    
    n+=1
    if n>500 :
        break
    print n
    print temp

    print urllib.quote(temp)
    print urllib.unquote(urllib.quote(temp))
f.close()
