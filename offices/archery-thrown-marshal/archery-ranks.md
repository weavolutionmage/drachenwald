---
title: Drachenwald Company of Archers
excerpt: Followers of the bow
toc: true
toc_label: Contents
---



{% if site.data.archery-ranks %}
  {% assign company-ranks = site.data.archery-ranks %}
  
{% else %}
  {% assign company-ranks = "" %}
  The company ranking isn't available right now - please check back later.
{% endif %}


# The Company of Archers

## Grand Master: By invitation. Teachers and scholars of archery 
<table>
  <tr><th>Name</th><th>Region</th><th>Group</th></tr>
 {% for itemAll in company-ranks %}{% if itemAll.Current_Rank == "Grand Master" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Region }} </td><td> {{ itemAll.Group }} </td></tr> {% endif %}{% endfor %}
</table>

## Master: Top rank, based on prowess with the bow
<table>
  <tr><th>Name</th><th>Region</th><th>Group</th></tr>
{% for itemAll in company-ranks %}{% if itemAll.Current_Rank == "Master" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Region }} </td><td> {{ itemAll.Group }} </td></tr> {% endif %}{% endfor %}
</table>

## Yeoman: Intermediate rank
<table>
  <tr><th>Name</th><th>Region</th><th>Group</th></tr>
{% for itemAll in company-ranks %}{% if itemAll.Current_Rank == "Yeoman" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Region }} </td><td> {{ itemAll.Group }} </td></tr> {% endif %}{% endfor %} 
</table>

## Archer: Initial rank
<table>
  <tr><th>Name</th><th>Region</th><th>Group</th></tr>
{% for itemAll in company-ranks %}{% if itemAll.Current_Rank == "Archer" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Region }} </td><td> {{ itemAll.Group }} </td></tr> {% endif %}{% endfor %}
</table>

## Companion: Members of the company of archery, yet to attain a rank
<table>
  <tr><th>Name</th><th>Region</th><th>Group</th></tr>
{% for itemAll in company-ranks %}{% if itemAll.Current_Rank == "Companion" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Region }} </td><td> {{ itemAll.Group }} </td></tr> {% endif %}{% endfor %}
</table>


Data last updated: {% for itemAll in company-ranks %}{% if itemAll.Name == "LastUpdate" %} {{ itemAll.Date }} {% endif %}{% endfor %}



