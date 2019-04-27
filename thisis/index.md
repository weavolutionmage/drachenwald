---
title: Made in Drachenwald
---
{% if site.data.thisisdrachenwald %}
  {% assign blogposts = site.data.thisisdrachenwald %}
  This are the latest posts from a variety of people in Drachenwald who are
  skilled in different arts, practices, or areas of study.
{% else %}
  {% assign blogposts = "" %}
  The blog posts aren't available right now - please check back later.
{% endif %}

{% for item in blogposts limit:10 %}
<h2><a href="{{ item.link }}">{{ item.title }}</a></h2>
<p>{{ item.summary }}</p>
{% endfor %}
