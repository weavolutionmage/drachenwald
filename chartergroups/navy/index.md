---
title: Drachenwald Navy
toc: true
toc_label: "Table of Contents"
---

The Royal Drachenwald Navy, established during the reign of Elffin I and Vanna I, offers several career opportunities for mariners loyal to Their Draconic Majesties.

Under the current naval programme, a loyal subject of the Crown who is interested in keeping the seas – or a foreigner who is willing to enter the service of our Crown – is eligible for a commission in the Royal Navy. A similarly reputable person who is not interested in a career in the regular navy but is willing to help by plundering the Crown's enemies can obtain a letter of marque.

Naval commissions and letters of marque are subject to a small administrative fee, payable to the Kingdom account to augment the royal travel fund:

* Admiral's commission: 30 €
* Captain's commission: 25 €
* Letter of Marque: 25 €

Commissions in the regular Navy are for a period of five years after which the officer will be retired, although renewals for expired commissions will be available at half price. Letters of Marque are valid unless and until revoked by the Crown.

In addition to paying the appropriate fee, a person wishing to join the Navy or obtain a Letter of Marque should write an application to the Clerk of the Crowns Ships. The application should include the following information:

* the name of the prospective naval officer
* in case of an Admiral's commission, the region for which the Admiral will be responsible
* in case of a Captain's commission, the name of the ship
*  in case of a Letter of Marque, the name of the ship and its home port
* e-mail address of the recipient
* evidence of payment of the fees, for instance the date and name under which the payment was made so that confirmation can be requested from the kingdom exchequer

# Current Commisions

{% if site.data.navy %}
  {% assign data = site.data.navy %}
  
{% else %}
  {% assign data = "" %}
  No information on challenges available right now - please check back later.
{% endif %}

## Admirals
{% for item in data %}
{% if item.rank == "Admiral" %}Letter of Marque
{{ item.full-name }}
: Rank: {{ item.rank }}
: Region: {{ item.in-command-of }}
: Commisioned/Last Renewed: {{ item.commissioned }} / {{ item.last-renewed }}
{% endif %}
{% endfor %}

## Captains
{% for item in data %}
{% if item.rank == "Captain" %}Letter of Marque
{{ item.full-name }}
: Rank: {{ item.rank }}
: Region: {{ item.in-command-of }}
: Home Port: {{ item.home-port }}
: Commisioned/Last Renewed: {{ item.commissioned }} / {{ item.last-renewed }}
{% endif %}
{% endfor %}
 
## Holders of a letter of Marque
{% for item in data %}
{% if item.rank == "Letter of Marque" %}
{{ item.full-name }}
: Rank: {{ item.rank }}
: Region: {{ item.in-command-of }}
: Home Port: {{ item.home-port }}
: Commisioned/Last Renewed: {{ item.commissioned }} / {{ item.last-renewed }}
{% endif %}
{% endfor %}
 

{% include chartered.html group="navy" %}

