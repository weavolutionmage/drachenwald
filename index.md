---
layout: splash
title: Welcome to the Kingdom of Drachenwald
excerpt: Medieval recreation with the Society for Creative Anachronism in Europe
feature_row:
  - image_path: /images/pic03.jpg
    alt: "placeholder image 1"
    title: "Eat, drink and be merry"
    excerpt: "Come for the food, stay for the friends."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: /images/pic02.jpg
    alt: "placeholder image 2"
    title: "Armoured combat, archery and fencing"
    excerpt: "Rediscover historical martial skills."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: /images/pic01.jpg
    title: "Learn the skills of the past"
    excerpt: "There's a multitude to choose from."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
---
<div style="margin-left:auto;margin-right:auto;max-width:800px">

The Kingdom of Drachenwald is a part of the Society for Creative Anachronism, Inc. (SCA), a not-for-profit educational organisation which studies the Middle Ages by recreating the pastimes and crafts of the period. International in scope, our activities include tournaments, festivals, classes, feasts, and all manner of arts and sciences you would find in the culture of pre-1600s western Europe.  

<p></p>

</div>

{% include feature_row %}

<div style="margin-left:auto;margin-right:auto;max-width:800px">

<h2>Upcoming Events</h2>

{% if site.data.events.eventlist %}
{% assign events = site.data.events.eventlist | sort:"start" %}
{% else %}
  {% assign events = "" %}
{% endif %}

{% for item in events limit:3 %}

  <!-- Excerpt -->
  <h3>{% unless item.web == "" %}<a href="{{ item.web }}">{% endunless %}{{ item.name }}{% unless item.web == "" %}</a>{% endunless %}</h3>
  {{ item.start | date: "%a, %d %b %Y" }}
  {% unless item.end == "" or item.end == item.start %} to {{ item.end | date: "%a, %d %b %Y" }}{% endunless %}<br>
  {{ item.group }}<br>
  ({{ item.country }})

{% endfor %}
      <p>&nbsp;</p>
      <p><a href="{{ site.baseurl }}{% link events/calendar.html %}" class="btn btn--primary">Events calendar...</a></p>
</div>