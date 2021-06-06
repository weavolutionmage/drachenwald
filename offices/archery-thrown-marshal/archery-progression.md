---
title: Drachenwald Company of Archers
excerpt: Progression through the ranks
toc: true
toc_label: Contents
---

# Archers progress in the company

{% if site.data.archery-progression %}
  {% assign progression = site.data.archery-progression %}
  
{% else %}
  {% assign progression = "" %}
  The progression list isn't available right now - please check back later.
{% endif %}


## Progression to Master rank 
<table>
  <tr><th>Name</th><th>Number of qualitying scores</th></tr>
 {% for itemAll in progression %}{% if itemAll.Next_Rank == "Master" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Qualifying_Scores }} </td></tr> {% endif %}{% endfor %}
</table>

## Progression to Yeoman rank
<table>
  <tr><th>Name</th><th>Number of qualitying scores</th></tr>
 {% for itemAll in progression %}{% if itemAll.Next_Rank == "Yeoman" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Qualifying_Scores }} </td></tr> {% endif %}{% endfor %}
</table>

## Progression to Archer rank
<table>
  <tr><th>Name</th><th>Number of qualitying scores</th></tr>
 {% for itemAll in progression %}{% if itemAll.Next_Rank == "Archer" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Qualifying_Scores }} </td></tr> {% endif %}{% endfor %}
</table>

## Entry to the company as a companion
<table>
  <tr><th>Name</th><th>Number of qualitying scores</th></tr>
 {% for itemAll in progression %}{% if itemAll.Next_Rank == "Companion" %} <tr><td> {{ itemAll.Name }} </td><td> {{ itemAll.Qualifying_Scores }} </td></tr> {% endif %}{% endfor %}
</table>
