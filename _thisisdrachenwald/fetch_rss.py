rssUrls = [{'name':'Close Fighting','url':'https://closefighting.blogspot.com/feeds/posts/default'},
           {'name':'Huys Uylenburgh','url':"https://huysuylenburgh.wordpress.com/feed/"},
            {'name':'Time traveling Órlaith','url':"https://pontagedue.wordpress.com/feed/"},
           {'name':'Handcrafted History','url':'https://handcraftedhistory.blog/feed/'},
           {'name':'16th Century Stitches','url':'https://16thcstitches.wordpress.com/feed/'},
           {'name':'Aros','url':'http://aros.nordmark.org/feed/'}]
results = []

import feedparser
import json
from bs4 import BeautifulSoup
import io
import requests

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

with io.open('_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    srtd = sorted(results, key=lambda i: i['published'], reverse=True)
    json.dump(srtd[0:50], outfile, ensure_ascii=False)


