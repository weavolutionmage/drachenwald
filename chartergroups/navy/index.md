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

## Obtaining a commission

To obtain a commission in the Navy or a Letter of Marque, you need to do three things:

### Pay the appropriate fees, as listed above:

Payments within the UK

    Kingdom of Drachenwald
    HSBC
    Account Number: 91484060
    Sort Code: 40-47-34

Payments elsewhere in the kingdom

    IBAN: GB86HBUK40473491484060
    BIC: HBUKGB4165G
    Account Name: SCA - Kingdom of Drachenwald
    Bank’s Address: 20 Badminton Road, Downend, Bristol, BS16 6BN
    Bank: HSBC

### Send e-mail to the Drachenwald Chancellor of the Exchequer, including

* your name as it appears on the payment (ie. mundane name)
* amount paid
* date of the payment
* reason for the payment: Drachenwald Navy

### Send e-mail to the Clerk of the Crowns Ships, including

* the name of the prospective officer as it will appear on the Navy roster (ie. SCA name)
* in case of an Admiral's commission, the region or other command for which the Admiral will be responsible
* in case of a Captain's commission, the name of the ship
*  in case of a Letter of Marque, the name of the ship and its home port
* e-mail address of the recipient
* evidence of payment of the fees – a copy of the information you sent to the Chancellor of the Exchequer is sufficient

# Current Commissions

{% if site.data.navy %}
  {% assign data = site.data.navy %}
  
{% else %}
  {% assign data = "" %}
  No information on challenges available right now - please check back later.
{% endif %}

## Admirals
{% for item in data %}
{% if item.rank == "Admiral" %}
{{ item.full-name }}
: Command: {{ item.in-command-of }}
: Commissioned / Last Renewed: {{ item.commissioned }} / {{ item.last-renewed }}
{% endif %}
{% endfor %}

## Captains
{% for item in data %}
{% if item.rank == "Captain" %}
{{ item.full-name }}
: Ship: {{ item.in-command-of }}
: Commissioned / Last Renewed: {{ item.commissioned }} / {{ item.last-renewed }}
{% endif %}
{% endfor %}
 
## Holders of a letter of Marque
{% for item in data %}
{% if item.rank == "Letter of Marque" %}
{{ item.full-name }}
: Ship: {{ item.in-command-of }}
: Home Port: {{ item.home-port }}
: Letter Granted: {{ item.commissioned }}
{% endif %}
{% endfor %}
 

{% include chartered.html group="navy" %}

