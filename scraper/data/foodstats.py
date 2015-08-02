
f = open("final.txt","r")

words = []

while True:
    temp = f.readline().strip('\n').strip().split('     ')
    name = temp[0].split()

    print len(words)
    for i in name:
        if i not in words:
            words.append(i)

f.close()
