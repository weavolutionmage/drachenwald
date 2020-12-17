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


#with open('_data/thisisdrachenwald_feedlist.json', 'r') as f:
#    rssUrls = json.load(f)

rssUrls = [{"url": "https://huysuylenburgh.wordpress.com/feed/", "name": "Huys Uylenburgh", "link":"https://huysuylenburgh.wordpress.com","merge": False,"showMedia":  True, "type":"blog"},
           {"name": "Yda v Boulogne's flickr feed", "url": "https://www.flickr.com/services/feeds/photos_public.gne?tags=thisisdrachenwald&id=70418651@N00", "link": "https://www.flickr.com/search/?sort=date-taken-desc&safe_search=1&tags=thisisdrachenwald&user_id=70418651%40N00&view_all=1", "merge": True,"showMedia": True, "type":"flickr"},#

           {"url": "https://www.instagram.com/explore/tags/drachenwald/", "name": "Huys Uylenburgh", "link":"https://www.instagram.com/explore/tags/drachenwald/","merge": False,"showMedia":  True, "type":"instagram"},
           {"url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC662iHKfpqVt9_HGYUt2-Xg", "name": "Avery's Youtube",
            "link": "https://www.instagram.com/explore/tags/drachenwald/", "merge": False, "showMedia": True,
            "type": "youtube"}
]



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
        if (rssUrl["type"]=="instagram"):
            if(r.status_code==200):
                soup = BeautifulSoup(r.text, features="html.parser")
                summary = soup.get_text()
                print(summary)
        else:
            feedResults = {}
            for entry in NewsFeed.entries:
                summaryLtd=""
                title=entry['title'],
                imageLst=[],
                link = entry['link']
                published = entry['published_parsed']
                if not(isinstance(title, str)):
                    #some RSS feeds, notably youtube result in a tuple for the title rather than a straight string
                    title=title[0]

                if (rssUrl["type"] == "youtube"):
                    #pprint.pprint(entry)
                    movielink=entry["link"]
                    summaryLtd = """<div class ="responsive-video-container" >  <iframe src = "%s" frameborder = "0" allowfullscreen = "" > </iframe > </div>""" % (movielink.replace("watch?v=","embed/"))
                else:
                    title = entry['title']
                    summaryTxt = ""

                    if ("summary" in entry.keys()):
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
                    #print(summary)
                    summaryLtd=summary
                    if (len(summaryLtd) >= 250):
                        summaryLtd = summary[0:summary.rfind(' ', 0, 250)]

                    #print(summaryLtd)
                    link = entry['link']
                    published = entry['published_parsed']

                    imageSource = None
                    imageLst = []

                    #retrieve image and convert to thumbnail
                    if showMedia and (len(images) > 0):
                        try:
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
                            try:
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
                            except Exception as e:
                                print("error on %s\n%s\n Error saving image: %s" % (rssUrl['url'],title, e))
                        except Exception as e:
                            print("error on %s\n%s\n Error handling image: %s" % (rssUrl['url'],title, e))
                    #    del response

                #key = "%s%s" % (published.tm_year*1000+ published.tm_yday, rssUrl['name'])
                key = "%s%s%s" % (published.tm_year * 1000 + published.tm_yday, published.tm_hour * 100 + published.tm_min,
                rssUrl['name'])

                postDict =  {'summary': summaryLtd, 'link': link, 'published': published, 'title': title,
                         'images': imageLst, "key":key}

                if mergePosts:
                    if (key in results.keys()):
                        lst = results[key]['lst']
                        lst.append(postDict)
                        random.shuffle(lst)
                        results[key]["lst"]=lst
                    else:
                        results[key]={"lst":[postDict], "merge": True, 'site': rssUrl['name'], "siteLink": rssUrl["link"]}
                else:
                        results[key]={"lst":[(postDict)],"merge":False, 'site': rssUrl['name'], "siteLink": rssUrl["link"]}

    except Exception as e:
        print("error on %s\n Error handling post: %s" % (rssUrl['url'], e))

#srtd = sorted(results, key=lambda i: i['published'], reverse=True)
srtd =  [results[key] for key in sorted(results.keys(), reverse=True)]

#pprint.pprint(srtd)
entries = srtd[0:50]
with io.open('_data/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(entries, outfile, ensure_ascii=False)

with io.open('thisis/thisisdrachenwald.json', 'w', encoding='utf-8') as outfile:
    json.dump(entries, outfile, ensure_ascii=False)


#pp.pprint(srtd[0:100])

#for i in srtd[0:20]:
#    print("%s: %s - %s -%s" %(i['published'],i['site'],i['title'], i['images']))

import yaml
with io.open('_data/thisisdrachenwald_feedlist.yaml', 'w', encoding='utf-8') as outfile:
    yaml.dump(rssUrls,outfile)



