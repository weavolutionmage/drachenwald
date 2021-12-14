---
title: Kingdom events open for bidding
---


{% if site.data.fullcalendar.bidlist %}
  {% assign bidlist = site.data.fullcalendar.bidlist %}

{% else %}
  {% assign bidlist  = "" %}
	The bidlist isn't available right now, please come back later.
{% endif %}

<table>

  <caption><h3>Bid List</h3></caption>
  
  <thead>
    <tr>
      <th scope="col"><strong><h3>Date</h3></strong></th>
      <th scope="col"><strong><h3>Region</h3></strong></th>
      <th scope="col"><strong><h3>Event</h3></strong></th>
      <th scope="col"><strong><h3>Due Date</h3></strong></th>
      <th scope="col"><strong><h3>Host</h3></strong></th>
      <th scope="col"><strong><h3>Bids</h3></strong></th>
    </tr>
  </thead>
{% for item in bidlist %}
    <tr>
	<td>{{ item.date  }}</td>
	<td>{{ item.region }}</td>
	<td>{{ item.event }}</td>
	<td>{{ item.due }}</td>
	<td>{{ item.group }}</td>
	<td>{{ item.bids }}</td>
    </tr>
{% endfor %}

</table>

<div style="text-align: center">
  <a href="{{ site.baseurl }}{% link events/calendar.html %}" class="btn btn--primary">View the calendar</a>
</div>
