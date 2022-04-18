---
title: Archery Marshal List 
excerpt: Archery marshals across the regions of Drachenwald
toc: true
toc_label: Contents
---

__Too long; didn't read:__ Current list of warranted marshals of archery and thrown weapons in Drachenwald. 
{: .notice--primary}

{% if site.data.archery-marshals %}
  {% assign archery-marshals = site.data.archery-marshals | sort: "Name" %}

{% else %}
  {% assign company-ranks = "" %}
  The marshal list isn't available right now - please check back later.
{% endif %}

# Archery and thrown weapons marshals

<table>
  <tr><td style="font-size:14pt">🏹</td><td> Archery marshal</td></tr>
  <tr><td style="font-size:14pt">🗡️</td><td> Thrown weapons marshal</td></tr>
  <tr><td style="font-size:14pt">📜</td><td> Warranting marshal</td></tr>
</table>

## Nordmark

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Nordmark" %} <tr><td> {{ itemAll.Name }} </td><td style="font-size:14pt"> {{ itemAll.Target_Archery }} </td><td style="font-size:14pt"> {{ itemAll.Thrown_Weapons }} </td><td style="font-size:14pt"> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>

## Insulae Draconis

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Insulae Draconis" %} <tr><td> {{ itemAll.Name }} </td><td style="font-size:14pt"> {{ itemAll.Target_Archery }} </td><td style="font-size:14pt"> {{ itemAll.Thrown_Weapons }} </td><td style="font-size:14pt"> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>

## Aarnimetsä

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Aarnimetsä" %} <tr><td> {{ itemAll.Name }} </td><td style="font-size:14pt"> {{ itemAll.Target_Archery }} </td><td style="font-size:14pt"> {{ itemAll.Thrown_Weapons }} </td><td style="font-size:14pt"> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>


## Central

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Central" %} <tr><td> {{ itemAll.Name }} </td><td style="font-size:14pt"> {{ itemAll.Target_Archery }} </td><td style="font-size:14pt"> {{ itemAll.Thrown_Weapons }} </td><td style="font-size:14pt"> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>


Data last updated: {% for itemAll in archery-marshals %}{% if itemAll.Name == "LastUpdate" %} {{ itemAll.Date }} {% endif %}{% endfor %}

