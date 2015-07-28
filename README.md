# For the Engineering Challenge of Holmusk

There are three parts for this repo: the scraper, server and the front end. 

## Scraper

<sub>In the scraper folder there is a simple scraper which I wrote and part of the data that I captured from MyFitnessPal. **scraper.py** is a 
simple scraper that can crawl data from the website one by one. It is not as fast as multithreaded version in the multithreading folder
but it is stable and won't get banned from the website. Everyday a single threaded scraper can crawl around 40,000 different types of food
data, considering the fact that MyFitnessPal does not have more than 2,000,000 food data it'll take less than 50 days to crawl all the data,
which is pretty acceptable. </sub>

For the multithreading version I was thinking about adding a random User-Agent function to make it more stable but as data scraping takes 
time and actually the single thread works fine, also I'm not gonna use VPS or different IPs(for the sake of the time). 

You need to pip install the following things in order to run the program:
- BeautifulSoup

Simply put the scraper inside any folder and run it.

Some other scripts are added to the scraper folder like data.py and database.py. These several scripts are only to proccess the text data in the data files. Sorry if the folder looks a mess it's a habbit that I developed during my 2 years in the lab. <sup>I think that is why I am the least talented student in my lab. I mean fuck it Google is harder than Harvard now.</sup>

The final data that is used in the database is in final.txt.

## Server
In order to run the server side code you need to npm install the following things:
- mongodb
- mongoose
- lazy (for file reading in database.js)

Also you should install [MDL](http://www.getmdl.io/started/index.html#download). Well This one is not important I'm just saying that I'm using new stuff. But if you want to build something onside of my stuff, which will be good for beginners, you should install this one.

