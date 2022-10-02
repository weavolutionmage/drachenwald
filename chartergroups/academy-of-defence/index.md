---
title: Drachenwald Academy of Defence 
excerpt: After the manner of the ancient schools of London
toc: true
toc_label: "Table of Contents"
redirect_from:
  - /chartergroups/academy-of-defense/
---
<img src="{{ site.baseurl }}{% link images/heraldry/academyofdefenseflag.gif %}" alt="Academy of Defense Badge">{: .align-left}  

The Academy promotes the noble art of fence within the Kingdom of Drachenwald through recognition, education, and training of fencers of all levels of skill. Membership is open, upon application to the Praeceptor, to all those who love the challenge of arms.  

Akin to a guild, the Academy has ranks which candidates challenge into, by meeting three companions of the Academy of appropriate skill level, in tests of skill at arms, and of endurance.  

* [Meeting minutes from Collegium of Defense in Mynydd Gwyn, May 2017]({{ site.baseurl }}{% link chartergroups/files/academy_meeting_minutes_06_05_2017.pdf %})  

# The Academy 

{% if site.data.academyofdefense %}
  {% assign roster = site.data.academyofdefense %}
  
  
{% else %}
  {% assign roster = "" %}
  The roster isn't available right now - please check back later.
{% endif %}

# Academy Roster
## Companions: who support the Academy and its members through their service
{% for itemAll in roster %}{% if itemAll.rank == "Companion" %}{{ itemAll.scaname }}  <br />{% endif %}{% endfor %}

## Members: who aspire to enter its ranks
{% for itemAll in roster %}{% if itemAll.rank == "Member" %}{{ itemAll.scaname }}  <br />{% endif %}{% endfor %}

## Free Scholars: who have achieved the first rank of the Academy
{% for itemAll in roster %}{% if itemAll.rank == "Free Scholar" %}{{ itemAll.scaname }}  <br />{% endif %}{% endfor %} 

## Provosts: who have achieved the middle rank of the Academy
{% for itemAll in roster %}{% if itemAll.rank == "Provost" %}{{ itemAll.scaname }}  <br />{% endif %}{% endfor %}

## Prefects: who hold the highest rank of the Academy
 {% for itemAll in roster %}{% if itemAll.rank == "Prefect" %}{{ itemAll.scaname }}  <br />{% endif %}{% endfor %}

{% include chartered.html group="academy-of-defence" %}