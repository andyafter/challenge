import HTMLParser

#f = open("0.txt",'r')
#a = f.readline().strip('\n').strip().split('     ')


flast = open("finaldata.txt",'w')
result = []
for fnum in range(48):
    f = open(str(fnum)+'.txt','r')
    while True:
        t = f.readline()
        if len(t)<=1:
            break
        if t not in result:
            # as the data grows bigger it would take dramatic amount of time
            # best way is to put them into database and query to avoid duplication
            result.append(t)
        # there might be possible duplication since the data has several break points

    f.close()

for i in result:
    flast.write(i)

flast.close()
        
