# For the Engineering Challenge of Holmusk

There is two parts for this repo: the scraper and the front end. 

In the scraper folder there is a simple scraper which I wrote and part of the data that I captured from MyFitnessPal. **scraper.py** is a 
simple scraper that can crawl data from the website one by one. It is not as fast as multithreaded version in the multithreading folder
but it is stable and won't get banned from the website. Everyday a single threaded scraper can crawl around 40,000 different types of food
data, considering the fact that MyFitnessPal does not have more than 2,000,000 food data it'll take less than 50 days to crawl all the data,
which is pretty acceptable. 

For the multithreading version I was thinking about adding a random User-Agent function to make it more stable but as data scraping takes 
time and actually the single thread works fine, also I'm not gonna use VPS or different IPs(for the sake of the time). 

You need to pip install the following things in order to run the program:
- BeautifulSoup
- pymongo (this one still have no use and I'm thinking about get rid of it)

Simply put the scraper inside any folder and run it.