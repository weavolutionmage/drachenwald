---
title: Made in Drachenwald
---
{% if site.data.thisisdrachenwald %}
  {% assign blogposts = site.data.thisisdrachenwald %}
{% else %}
  {% assign blogposts = "" %}
{% endif %}

{% for item in blogposts limit:10 %}
<h2><a href="{{ item.link }}">{{ item.title }}</a></h2>
<p>{{ item.summary }}</p>
{% endfor %}
