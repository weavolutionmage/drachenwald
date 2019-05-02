import feedparser
import json
from bs4 import BeautifulSoup
import io
import requests


rssUrls=[]

with open('../_data/thisisdrachenwald_feedlist.json', 'r') as f:
    rssUrls = json.load(f)


results = []


for rssUrl in rssUrls:
    try:
        #NewsFeed = feedparser.parse(rssUrl)
        r = requests.get(rssUrl['url'], timeout=5)
        NewsFeed = feedparser.parse(r.text)

        for entry in NewsFeed.entries:
            title = entry['title']
            summary = BeautifulSoup(entry['summary'], features="html.parser").get_text()
            summaryLtd = summary[0:summary.rfind(' ',0,250)]

            link = entry['link']
            published = entry['published_parsed']
            results.append({'summary':summaryLtd, 'link':link,'published':published,'title':title,'site':rssUrl['name']})
    except Exception as e:
        print("%s" % e)


srtd = sorted(results, key=lambda i: i['published'], reverse=True)

with io.open('../_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(srtd[0:50], outfile, ensure_ascii=False)

#for i in srtd[0:20]:
#    print("%s: %s - %s" %(i['published'],i['site'],i['title']))


