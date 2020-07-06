---
title: Drachenwald Academy of Defence 
excerpt: After the manner of the ancient schools of London
redirect_from:
  - /chartergroups/academy-of-defense/
---
<img src="{{ site.baseurl }}{% link images/heraldry/academyofdefenseflag.gif %}" alt="Academy of Defense Badge">{: .align-left}  

The Academy promotes the noble art of fence within the Kingdom of Drachenwald through recognition, education, and training of fencers of all levels of skill. Membership is open, upon application to the Praeceptor, to all those who love the challenge of arms.  

Akin to a guild, the Academy has ranks which candidates challenge into, by meeting three companions of the Academy of appropriate skill level, in tests of skill at arms, and of endurance.  

* [Academy charter and bylaws]({{ site.baseurl }}{% link chartergroups/files/academy_defense_charter_2017_05_20.pdf %})  
* [Meeting minutes from Collegium of Defense in Mynydd Gwyn, May 2017]({{ site.baseurl }}{% link chartergroups/files/academy_meeting_minutes_06_05_2017.pdf %})  
* [Yahoogroup](http://groups.yahoo.com/group/DW_AC/)  
* [Facebook group](https://www.facebook.com/groups/DWAcademyOfDefense/)  

# The Academy 

{% if site.data.thisisdrachenwald %}
  {% assign roster = site.data.academyofdefense %}
  
{% else %}
  {% assign roster = "" %}
  The roster isn't available right now - please check back later.
{% endif %}


## Companions: who support the Academy and its members through their service
{% for itemAll in roster %}{% if itemAll.Rank == "Companion" %}{{ itemAll.SCAName }}  <br />{% endif %}{% endfor %}

## Members: who aspire to enter its ranks
{% for itemAll in roster %}{% if itemAll.Rank == "Member" %}{{ itemAll.SCAName }}  <br />{% endif %}{% endfor %}

## Free Scholars: who have achieved the first rank of the Academy
{% for itemAll in roster %}{% if itemAll.Rank == "Free Scholar" %}{{ itemAll.SCAName }}  <br />{% endif %}{% endfor %} 

## Provosts: who have achieved the middle rank of the Academy
{% for itemAll in roster %}{% if itemAll.Rank == "Provost" %}{{ itemAll.SCAName }}  <br />{% endif %}{% endfor %}

## Prefects: who hold the highest rank of the Academy
 {% for itemAll in roster %}{% if itemAll.Rank == "Prefect" %}{{ itemAll.SCAName }}  <br />{% endif %}{% endfor %}

## Preceptor
Master Esbiorn Jensson (D. Cordes) <script type="text/javascript">document.write(String.fromCharCode(60,97,32,104,114,101,102,61,39,109,97,105,108,116,111,58,100,97,118,105,100,46,99,111,114,100,101,115,64,103,109,97,105,108,46,99,111,109,39,62,100,97,118,105,100,46,99,111,114,100,101,115,64,103,109,97,105,108,46,99,111,109,60,47,97,62));</script>  

## Scribe
Mistress Gwenllian verch Andreas (K. Bernard) <script type="text/javascript">document.write(String.fromCharCode(60,97,32,104,114,101,102,61,39,109,97,105,108,116,111,58,107,97,116,104,108,121,110,98,101,114,110,97,114,100,64,103,109,97,105,108,46,99,111,109,39,62,107,97,116,104,108,121,110,98,101,114,110,97,114,100,64,103,109,97,105,108,46,99,111,109,60,47,97,62));</script>

