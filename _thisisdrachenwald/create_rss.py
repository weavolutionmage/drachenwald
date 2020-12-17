import json
import io
import shutil
import os, sys
import random
import pprint
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
        print(type(title))
        print(title)
        fe = fg.add_entry()
        fe.id(gid)
        fe.title(title)
        fe.link(href=entry['siteLink'])



print(fg.rss_str())


fg.rss_file('thisis/rss.xml')


