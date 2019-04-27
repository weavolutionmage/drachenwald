rssUrls = ['https://dragonscribes.blogspot.com/feeds/posts/default',
           "https://huysuylenburgh.wordpress.com/feed/",
           'https://thoragreylock.wordpress.com/feed/',
           'https://liadethornegge.dreamwidth.org/data/rss',
           'https://handcraftedhistory.blog/feed/',
           'https://16thcstitches.wordpress.com/feed/',
           'http://aros.nordmark.org/feed/']
results = []

import feedparser
import json
from bs4 import BeautifulSoup
import io
import requests

for rssUrl in rssUrls:
    try:
        #NewsFeed = feedparser.parse(rssUrl)
        r = requests.get(rssUrl, timeout=5)
        NewsFeed = feedparser.parse(r.text)

        for entry in NewsFeed.entries:
            title = entry['title']
            summary = BeautifulSoup(entry['summary'], features="html.parser").get_text()
            summaryLtd = summary[0:summary.rfind(' ',0,250)]

            link = entry['link']
            published = entry['published_parsed']
            print(title)
            results.append({'summary':summaryLtd, 'link':link,'published':published,'title':title})
    except Exception as e:
        print("%s" % e)
with io.open('../_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(sorted(results, key = lambda i: i['published'], reverse = True), outfile, ensure_ascii=False)