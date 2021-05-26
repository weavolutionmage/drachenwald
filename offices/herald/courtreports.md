---
title: Court Reports
excerpt:  The latest posts from a variety of people in Drachenwald who are skilled in different arts, practices, or areas of study.
---


{% if site.data.courtreports %}
  {% assign courtreports = site.data.courtreports %}

{% else %}
  {% assign courtreports = "" %}
No court reports available right now, please come back later.
{% endif %}

{% for itemAll in courtreports %}
* {{ itemAll.event }}: {{ itemAll.court }} court, {{ itemAll.court_name }}, {{ court_date }} submitted by {{ court.filed_by }} on {{ court.court_date }}
{% endfor %}

