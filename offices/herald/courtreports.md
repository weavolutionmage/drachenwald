---
title: Court Reports
excerpt:  An overview of court reports submitted using the court report form.
---

This is an overview of court reports submitted using the court report form. If you're missing an award in the OP, and don't see the court on the list here check with the herald if the report has been submitted.

If the court is listed here but hasn't been published yet it in the Dragon's Tale or the OP it probably will be soon. Contact the relevant officers after a reasonable time has passed. 

{% if site.data.courtreports %}
  {% assign courtreports = site.data.courtreports %}

{% else %}
  {% assign courtreports = "" %}
No court reports available right now, please come back later.
{% endif %}

# Court reports in the queue
{% for itemAll in courtreports %}
{% unless itemAll.status == 'Completed' %}
* {{ itemAll.event_name }}: {{ itemAll.court }} court, {{ itemAll.court_name }}, {{ itemAll.court_date }} submitted by {{ itemAll.filed_by }} on {{ itemAll.date_submitted }}. {% unless itemAll.status == "" %} The report  is currently {{ itemAll.status }}. {% endunless %}
{% endunless %}
{% endfor %}

# Court reports fully added to the Order of Precedence
{% assign completed = courtreports | where: "status", "Completed" %}
{% for itemAll in completed %}
* {{ itemAll.event_name }}: {{ itemAll.court }} court, {{ itemAll.court_name }}, {{ itemAll.court_date }} submitted by {{ itemAll.filed_by }} on {{ itemAll.date_submitted }}
{% endfor %}