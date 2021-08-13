import json
import io
import shutil
import os, sys
import random
import pprint
import datetime
import pytz
pp = pprint.PrettyPrinter(indent=4)

entries = []

with open('thisis/thisisdrachenwald.json', 'r') as f:
    entries = json.load(f)


from feedgen.feed import FeedGenerator
fg = FeedGenerator()
fg.id('https://drachenwald.sca.org/thisis/')
fg.title('This is Drachenwald')
fg.link( href='https://drachenwald.sca.org/thisis/',rel='self')
fg.subtitle('Updates from the Drachenwald populace on social media')


for entry in entries:
    if(entry['merge']):
        print("needs to be merged")
    else:
        print("merged")
        item=entry['lst'][0]
        gid=item['link']
        title=item['title']
        fe = fg.add_entry()
        fe.id(gid)
        fe.title(title)
        fe.link(href=entry['link'])
        pb = item['published']
        print(pb)
        pub = datetime.datetime(pb[0],pb[1],pb[2],pb[3],pb[4],pb[5],pb[6],pytz.timezone("America/Los_Angeles"))
        #timezone = pytz.timezone("America/Los_Angeles")
        #d_aware = timezone.localize(d)
        type(pub)
        print(pub)
        fe.published(pub)
        fe.summary(item['summary'])
        fe.guid(gid,permalink=True)



print(fg.rss_str())


fg.rss_file('thisis/rss.xml')


