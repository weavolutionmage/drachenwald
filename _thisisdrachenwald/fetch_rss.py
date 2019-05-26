import feedparser
import json
from bs4 import BeautifulSoup
import io
import time
import requests
import shutil
import os, sys
from PIL import Image


rssUrls=[]

with open('_data/thisisdrachenwald_feedlist.json', 'r') as f:
    rssUrls = json.load(f)
import requests
import shutil
import os, sys
from PIL import Image


rssUrls=[]

with open('_data/thisisdrachenwald_feedlist.json', 'r') as f:
    rssUrls = json.load(f)








results = {}

print(rssUrls)
thumbDir = "renderedImages"
dlDir = "_dlImages"
if (not os.path.isdir(thumbDir)):
    os.mkdir(thumbDir)
if (not os.path.isdir(dlDir)):
    os.mkdir(dlDir)


for rssUrl in rssUrls:
    try:
        #NewsFeed = feedparser.parse(rssUrl)
        r = requests.get(rssUrl['url'], timeout=5)
        NewsFeed = feedparser.parse(r.text)
        showMedia = False
        if ("showMedia" in rssUrl):
            showMedia = rssUrl["showMedia"]
        mergePosts = False
        if ("merge" in rssUrl):
            mergePosts = rssUrl["merge"]

        feedResults = {}

        for entry in NewsFeed.entries:
            title = entry['title']
            summaryTxt = entry['summary']
            soup  = BeautifulSoup(summaryTxt, features="html.parser")
            summary = soup.get_text()
            images = []
            for img in soup.findAll('img'):
                images.append(img.get('src'))
            summaryLtd = summary[0:summary.rfind(' ',0,250)]

            link = entry['link']
            published = entry['published_parsed']

            imageSource = None
            imageLst = []

            #retrieve image and convert to thumbnail
            if showMedia and (len(images) > 0):
                imageUrl = images[0]
                fnName = "%s" % imageUrl[imageUrl.rfind('/')+1:len(imageUrl)]
                fn = "%s/%s" % (dlDir, fnName)
                if (not os.path.isfile(fn)):
                    response = requests.get(images[0], stream=True)
                    with open(fn, 'wb') as out_file:
                        shutil.copyfileobj(response.raw, out_file)


                size = 250, 250

                file, ext = os.path.splitext(fnName)
                thumbFn = "%s/%s.thumbnail.jpg" % (thumbDir,file)
                if (not os.path.isfile(thumbFn)):
                    im = Image.open(fn)
                    im.thumbnail(size)
                    im.save(thumbFn, "JPEG")

                imgDict = {"imgSrc": imageUrl, "thumb":thumbFn}
                imageLst.append(imgDict)

            #    del response

            key = "%s%s%s" % (published.tm_year, published.tm_yday, rssUrl['name'])

            postDict =  {'summary': summaryLtd, 'link': link, 'published': published, 'title': title, 'site': rssUrl['name'],
                 'images': imageLst}

            if mergePosts:
                if (key in results.keys()):
                    lst = results[key]['lst']
                    lst.append(postDict)
                    results[key]["lst"]=lst
                else:
                    results[key]={"lst":[postDict], "merge": True}
            else:
                results[key]={"lst":[(postDict)],"merge":False}


    except Exception as e:
        print("%s" % e)

#import pprint
#pp = pprint.PrettyPrinter(indent=4)



#srtd = sorted(results, key=lambda i: i['published'], reverse=True)
srtd =  [results[key] for key in sorted(results.keys(), reverse=True)]


with io.open('_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(srtd[0:50], outfile, ensure_ascii=False)


pp.pprint(srtd[0:50])

#for i in srtd[0:20]:
#    print("%s: %s - %s -%s" %(i['published'],i['site'],i['title'], i['images']))

import yaml
with io.open('_data/thisisdrachenwald_feedlist.yaml', 'w', encoding='utf-8') as outfile:
    yaml.dump(rssUrls,outfile)
