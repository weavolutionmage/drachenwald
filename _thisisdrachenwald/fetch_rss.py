import feedparser
import json
from bs4 import BeautifulSoup
import io
import requests
import shutil
import os, sys
from PIL import Image
import hashlib
#import pprint
#pp = pprint.PrettyPrinter(indent=4)

rssUrls=[]

with open('_data/thisisdrachenwald_feedlist.json', 'r') as f:
    rssUrls = json.load(f)



rssUrls=[]

with open('_data/thisisdrachenwald_feedlist.json', 'r') as f:
    rssUrls = json.load(f)


#rssUrls=[{"url": "https://huysuylenburgh.wordpress.com/feed/", "name": "Huys Uylenburgh", "link":"https://huysuylenburgh.wordpress.com","merge": False,"showMedia":  True}, {"name":  "Lia's Flickr feed", "url": "https://api.flickr.com/services/feeds/photos_public.gne?id=90046361@N00&lang=en-us&format=rss_200&tag=Drachenwald", "link":  "https://www.flickr.com/photos/liabucket/", "merge": true, "showMedia":  true}]


results = {}

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
            mediaTxt = summaryTxt
            #Wordpress doesn't have the images in the summary field, based on generator using a different field
            try:
                if (NewsFeed.channel["generator"] == 'http://wordpress.com/'):
                    mediaTxt = entry["content"][0]["value"]
            except Exception as e:
                mediaTxt = summaryTxt
                
            soup  = BeautifulSoup(mediaTxt, features="html.parser")
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
                filehash = hashlib.md5(imageUrl.encode()).hexdigest()

                fnName = "%s" % imageUrl[imageUrl.rfind('/')+1:len(imageUrl)]
                fnName = filehash
                fn = "%s/%s" % (dlDir, fnName)
                if (not os.path.isfile(fn)):
                    user_agent = {'User-agent': 'This is Drachenwald'}
                    response = requests.get(imageUrl, stream=True, headers=user_agent)
                    with open(fn, 'wb') as out_file:
                        shutil.copyfileobj(response.raw, out_file)


                size = 250, 250

                #file, ext = os.path.splitext(fnName)
                file = fnName
                thumbFn = "%s/%s.thumbnail.jpg" % (thumbDir,file)
                width=0
                height=0
                if (not os.path.isfile(thumbFn)):
                    im = Image.open(fn)
                    im.thumbnail(size)
                    im.save(thumbFn, "JPEG")
                    width, height = im.size
                else:
                    im = Image.open(fn)
                    width, height = im.size

                imgDict = {"imgSrc": imageUrl, "thumb":thumbFn, "width":width, "height": height}
                imageLst.append(imgDict)

            #    del response

            key = "%s%s%s" % (published.tm_year, published.tm_yday, rssUrl['name'])

            postDict =  {'summary': summaryLtd, 'link': link, 'published': published, 'title': title,
                 'images': imageLst}

            if mergePosts:
                if (key in results.keys()):
                    lst = results[key]['lst']
                    lst.append(postDict)
                    results[key]["lst"]=lst
                else:
                    results[key]={"lst":[postDict], "merge": True, 'site': rssUrl['name'], "siteLink": rssUrl["link"]}
            else:
                results[key]={"lst":[(postDict)],"merge":False, 'site': rssUrl['name'], "siteLink": rssUrl["link"]}


    except Exception as e:
        print("error: %s" % e)



#srtd = sorted(results, key=lambda i: i['published'], reverse=True)
srtd =  [results[key] for key in sorted(results.keys(), reverse=True)]


with io.open('_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(srtd[0:100], outfile, ensure_ascii=False)


#pp.pprint(srtd[0:100])

#for i in srtd[0:20]:
#    print("%s: %s - %s -%s" %(i['published'],i['site'],i['title'], i['images']))

import yaml
with io.open('_data/thisisdrachenwald_feedlist.yaml', 'w', encoding='utf-8') as outfile:
    yaml.dump(rssUrls,outfile)
