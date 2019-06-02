---
title: This is Drachenwald
excerpt:  The latest posts from a variety of people in Drachenwald who are skilled in different arts, practices, or areas of study.
---
{% if site.data.thisisdrachenwald %}
  {% assign blogposts = site.data.thisisdrachenwald %}

{% else %}
  {% assign blogposts = "" %}
  The blog posts aren't available right now - please check back later.
{% endif %}

{% for itemAll in blogposts limit:20 %}
{% if itemAll.merge %}
{% assign item = itemAll.lst | first %}
<h3><a href="{{ item.link }}">{{ item.title }}</a></h3>
<h5><em>{{ item.site }} on {{ item.published[0] }}-{{ item.published[1] }}-{{ item.published[2] }}</em></h5>
<p>{{ item.summary }}</p>
{% else %}

{% assign item = itemAll.lst | first %}
{% assign imageLst = item.images %}
{% assign imageLstSize = imageLst | size %}

<h3><a href="{{ item.link }}">{{ item.title }}</a></h3>
<h5><em>{{ item.site }} on {{ item.published[0] }}-{{ item.published[1] }}-{{ item.published[2] }}</em></h5>
<p>
{% if imageLstSize != 0 %}
{% assign image = imageLst | first %}
<img src='/{{ image.thumb }}' ALIGN="left" />
{% endif %}
{{ item.summary }}</p>
{% endif %}
{% endfor %}

# Contributors

Would you like to read some more? Visit the blogs of all our contributors:

{% for item in site.data.thisisdrachenwald_feedlist %}
* [{{ item.name }}]({{ item.link }})
{% endfor %}
