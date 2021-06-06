import feedparser
import json
from bs4 import BeautifulSoup
import io
import requests
import shutil
import os, sys
from PIL import Image
import hashlib
import random
import pprint
pp = pprint.PrettyPrinter(indent=4)

rssUrls=[]


rssUrls = [{"origin":"sca.org", "url":"https://www.sca.org/category/announcements/feed/"}]

results = {}

thumbDir = "renderedImages"
dlDir = "_dlImages"
if (not os.path.isdir(thumbDir)):
    os.mkdir(thumbDir)
if (not os.path.isdir(dlDir)):
    os.mkdir(dlDir)


for rssUrl in rssUrls:
    try:
        r = requests.get(rssUrl['url'], timeout=5)
        r.encoding = "utf-8"
        print(r.encoding)
        plain_text = r.content.decode("utf-8").encode("utf-8")
        NewsFeed = feedparser.parse(plain_text)
        feedResults = {}
        for entry in NewsFeed.entries:
            summary = entry['summary']
            title = entry['title']
            imageLst = []
            link = entry['link']
            published = entry['published_parsed']

            print("========================================================================")
            print("========================================================================")
            print(link)
            print(published)
            print(summary)
    except Exception as e:
        print("error on %s\n Error handling post: %s" % (rssUrl['url'], e))

#pprint.pprint(srtd)

#with io.open('_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
#    json.dump(srtd[0:50], outfile, ensure_ascii=False)

#with io.open('thisis/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
#    json.dump(srtd[0:50], outfile, ensure_ascii=False)

#pp.pprint(srtd[0:100])

#for i in srtd[0:20]:
#    print("%s: %s - %s -%s" %(i['published'],i['site'],i['title'], i['images']))



