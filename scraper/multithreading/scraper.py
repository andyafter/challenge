import urllib2
import HTMLParser
import threading
from BeautifulSoup import BeautifulSoup
from pymongo import MongoClient





class Scraper:
    def __init__(self,baseURL,seed):
        # this here the seed means the later part of the starting url
        self.baseURL = baseURL
        self.food    = []
        self.all_food_links = []  # storing all food links
        # just to make sure that duplicate food requests are processed securely
        self.all_brand_links = []  # same as above
        
        self.brand   = []  # storing brands links
        ## food list contains anything of a food
        ## later this can be defined as a hashmap to
        ## contain information about the food
        #### does a scraper has to contain a list for brands?
        self.status  = "food"
        # status means the url you are requesting is a url for food

        self.food.append(seed)

    def __doc__(self):
        return "This is an object of the Scraper class, you want some doc? You have to pay."

    def food_thread(self,temp,f):
        res = []

        try:
            res = self.food_link(temp)
        except:
            self.food.append(temp)
                                
        t = ''
        if not res:
            return
        for i in res:
            t+=i
            t+='     '
        t+='\n'
        print t
        f.write(t)

        
    def fetch(self):
        # fetch on from remote with a url from queues,
        # return all the information about a specific food.
        # if a brand url is used then return a string "brand" so that
        # no info needs to be stored.
        # all the rules comes from this function

        # This function assumes that your ram is enough to store all these
        # food names and links(it actually won't take more than 200MB)

        n = 0
        m = 0
        f = open(str(m)+'.txt','w')
        while True:
            tlist = []
            lbefore = len(self.food)
            print "tetwetttttttttttttttttttttttttttt"
            print lbefore

            num = 0
            # num is used to control the thread limitation here
            while self.food:
                num += 1
                if num>=20:
                    break
                temp = self.food.pop()
                th = threading.Thread(target = self.food_thread, args=(temp,f,))
                tlist.append(th)
            for i in tlist:
                i.start()
            for i in tlist:
                i.join()
                
            n+=1
            print str(n) + "#####################################" + str(n)
            if n>=200:
                f.close()
                m+=1
                n=0
                f = open(str(m)+'.txt','w')

            if self.food:
                continue
            
            if not self.brand:
                break
            temp = self.brand.pop()
            try:
                self.brand_link(temp)
            except:
                self.brand.append(temp)
            
        return "end" # there is no link in all queues, terminates the scraper
        
    def food_link(self,URL):
        # all the URL in a parameter is the later parts like the food link or brand
        print self.baseURL+URL
        res = urllib2.urlopen(self.baseURL+URL)
        soup = BeautifulSoup(res)
        hparser = HTMLParser.HTMLParser()
        result = []
        for link in soup.findAll('a'):
            if link['href'][0:2]=='/f':
                # first character 'f' is the link for a food name
                ######
                ###### each food needs to be checked in database to see
                ###### if it already exists
                if link['href'] in self.all_food_links:
                    continue
                self.all_food_links.append(link['href'])
                
                if link['href'] in self.food: # double check to save life
                    continue
                self.food.append(link['href'])
                
                
            elif link['href'][0:2]=='/n':
                if link['href'] in self.all_brand_links:
                    continue
                self.all_brand_links.append(link['href'])
                if link['href'] not in self.brand:
                    self.brand.append(link['href'])
            
        for des in soup.findAll('h2', {'class':"food-description"}):
            # here I omitted the part for the string to be unescaped in order for the ascii codes to be
            # able to pass through
            # you can always decode
            temp = des.renderContents().split('-')
            
            if len(temp)>=2:
                result.append(temp[1])  # food name
                result.append(temp[0])  # company name
                
        for t in soup.findAll('td'):
            temp = t.renderContents()
            if temp[0]=='&' and temp[-1]==';':
                continue
            result.append(temp)
            
        return  result
        # change it to storing to database when you are about to finish

    def brand_link(self,URL):
        # for a brand link there might contain the exact same link in the page
        # as the URL, so you need to check.
        res = urllib2.urlopen(self.baseURL+URL)
        soup = BeautifulSoup(res)
        for link in soup.findAll('a'):
            if link['href'] == URL:
                continue
            elif URL in link['href'] and link['href'][0] == '/':
                # when the URL is part of the link href
                # also the link is about food ot brand
                # means that there is multiple page for this
                r = urllib2.urlopen(self.baseURL+link['href'])
                s = BeautifulSoup(r)
                for l in s.findAll('a'):
                    if URL in l['href']:
                        # here you don't care about the page info because
                        # it is already another page
                        continue
                    if l['href'][0:2] == '/f':
                        ## instead of doing the search in the queue
                        ## here should be another check in the database
                        ## here I changed the checking into direct memory operation
                        if l['href'] in self.all_food_links:
                            continue
                        if l['href'] not in self.food:
                            self.food.append(l['href'])
                    elif l['href'][0:2] == '/n':
                        # this is important you need to ignore all links
                        # that is just other pages of the same brand
                        if l['href'] not in self.brand and URL not in l['href']:
                            if l['href'] not in self.all_brand_links:
                                self.all_brand_links.append(l['href'])
                                self.brand.append(l['href'])
                continue

            # when it's food
            if link['href'][0:2] == '/f':
                if link['href'] in self.food or link['href'] in self.all_food_links:
                    continue
                else:
                    self.food.append(link['href'])
                    self.all_food_links.append(link['href'])
            if link['href'][0:2] == '/n':
                if link['href'] not in self.brand:
                    if l['href'] not in self.all_brand_links:
                        self.all_brand_links.append(l['href'])
                        self.brand.append(l['href'])


a = Scraper("http://www.myfitnesspal.com","/food/calories/24557817")

a.fetch()
