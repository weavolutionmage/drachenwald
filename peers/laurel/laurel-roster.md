---
title: Order of the Laurel
toc: true
toc_label: Members
excerpt: Roster of members
---


{% if site.data.laurelroster %}
  {% assign roster = site.data.laurelroster %}

{% else %}
  {% assign roster  = "" %}
	The roster isn't available right now, please come back later.
{% endif %}

{% for item in roster %}
{% assign online = "" | split: ', ' %}
{% unless item.facebook == "" %} {% assign online = online | push: item.facebook %} {% endunless %} 
{% unless item.blog == "" %} {% assign online = online | push: item.blog %} {% endunless %} 
{% unless item.instagram == "" %} {% assign online = online | push: item.instagram %} {% endunless %} 
{% unless item.other_online_presence == "" %} {% assign online = online | push: item.other_online_presence %} {% endunless %} 
{% unless item.flickr == "" %} {% assign online = online | push: item.flickr %} {% endunless %} 

{% assign affil = "" | split: ', ' %}
{% unless item.households == "" %} {% assign affil = online | push: item.households %} {% endunless %} 
{% unless item.apprentices == "" %} {% assign affil = online | push: item.apprentices %} {% endunless %} 
{% unless item.students == "" %} {% assign affil = online | push: item.students %} {% endunless %} 

## {{ item.title }} {{ item.name }}
{% unless item.region == "" %} **Region**: {{ item.region }} {% endunless %}

{% unless item.primary_skills == "" %} **Primary artforms/Elevated for**: {{ item.primary_skills }} {% endunless %}

{% unless item.dabbling == "" %} **Dabbles in**: {{ item.dabbling }} {% endunless %}

{% unless item.contact == "" %} **Contact**: {{ item.contact }} {% endunless %}

{% unless online.size < 1 %}
**Online presence**: 
{% unless item.facebook == "" %} * [{{ item.facebook }}]( {{ item.facebook  }} ) {% endunless %}
{% unless item.instagram == "" %} * [{{ item.instagram }}]( {{ item.instagram  }} ) {% endunless %}
{% unless item.blog == "" %} * [{{ item.blog }}]( {{ item.blog }} ) {% endunless %}
{% unless item.other_online_presence == "" %} * [{{ item.other_online_presence }}]( {{ item.other_online_presence }} ) {% endunless %}
{% unless item.flickr == "" %} * [{{ item.flickr }}]({{ item.flickr }}) {% endunless %}
{% endunless %}

{% unless affil.size < 1 %}
**Apprentices/Students/Household affiliations**: 
{% unless item.households == "" %}* Households: {{ item.households }}{% endunless %}
{% unless item.apprentices == "" %}* Apprentices: {{ item.apprentices }}{% endunless %}
{% unless item.students == "" %}* Students: {{ item.students }}{% endunless %}
{% endunless %}

{% unless item.elevated == "" %} **Elevated by whom and when:** {{ item.elevated }} {% endunless %}

{% unless item.classes == "" %} **Classes I have held/are willing to hold:** {{ item.classes }} {% endunless %}


{% endfor %}
