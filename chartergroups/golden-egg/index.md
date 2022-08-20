---
title: Society of the Golden Egg
---

{% if site.data.golden-egg %}
  {% assign data = site.data.golden-egg %}
  
{% else %}
  {% assign data = "" %}
  No information on challenges available right now - please check back later.
{% endif %}

# Current Challengers
{% for item in data %}
{% if item.household-status-membership == "Challenger" %}
{{ item.sca-name }}
: {{ item.projekt-name }}
: {{ item.project-read-into-court }} - {{ item.planned-finish-dated }}
{% endif  %}


{% endfor %}

# Household Members
{% for item in data %}
{% if item.household-status-membership == "Member" %}
{{ item.sca-name }}
: {{ item.projekt-name }}
: {{ item.officially-became-a-member-of-the-society }} - {{ item.member-until }}
{% endif  %}
{% endfor %}

# Former Household Members
{% for item in data %}
{% if item.household-status-membership == "Retired" %}
{{ item.sca-name }}
: {{ item.projekt-name }}
: {{ item.officially-became-a-member-of-the-society }} - {{ item.member-until }}
{% endif  %}
{% endfor %}

<br/>



{% include chartered.html group="golden-egg" %}

