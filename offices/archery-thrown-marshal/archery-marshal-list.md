---
title: Archery Marshal List 
excerpt: Catalog of archery marshals in the regions of Drachenwald
toc: true
toc_label: Contents
---

__Too long; didn't read:__ Current list of marshals of archery and thrown weapons in Drachenwald. 
{: .notice--primary}

# Archery and thrown weapons marshals 

{% if site.data.thisisdrachenwald %}
  {% assign archery-marshals = site.data.archery-marshals | sort: "Name" %}

{% else %}
  {% assign company-ranks = "" %}
  The marshal list isn't available right now - please check back later.
{% endif %}



## Nordmark

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Nordmark" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Target_Archery }} </td><td> {{ itemAll.Thrown_Weapons }} </td><td> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>

## Insulae Draconis

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Insulae Draconis" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Target_Archery }} </td><td> {{ itemAll.Thrown_Weapons }} </td><td> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>

## Aarnimetsä

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Aarnimetsä" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Target_Archery }} </td><td> {{ itemAll.Thrown_Weapons }} </td><td> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>


## Central

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Central" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Target_Archery }} </td><td> {{ itemAll.Thrown_Weapons }} </td><td> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>


## Southern

<table>
  <tr><th>Name</th><th>Archery</th><th>Thrown weapons</th><th>Warranting</th></tr>
 {% for itemAll in archery-marshals %}{% if itemAll.Region == "Southern" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Target_Archery }} </td><td> {{ itemAll.Thrown_Weapons }} </td><td> {{ itemAll.Warranting }} </td></tr> {% endif %}{% endfor %} 
</table>


