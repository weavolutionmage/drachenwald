---
title:  "New website features"
excerpt: "Happy new year! The web artificers have been hard at work on new features to make it easier to find events and support group webministers."
date:   2019-12-30 17:00:00 +0000
tags: webartificers
category: news
author: sela
tldr: "Code for webministers to include the Kingdom event calendar on their group's website."
---
Greetings and happy new (mundane) year! The web artificers are happy to announce new features of the Drachenwald website.

The first feature is a change to the [event calendar]({{ site.baseurl }}{% link events/calendar/index.md %}). You might have noticed a slight change to how it looks. This is because your browser is now pulling the live information directly, instead of having to wait for a rebuild of the website itself (which usually happens once a day.)

The second feature is that it is now possible for any webminister to display the Kingdom calendar, or only those events organised by nearby groups, on their website. If you are a webminister, add this code to a page, and the calendar will appear:

{% highlight html %}
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
<script src="https://unpkg.com/papaparse@latest/papaparse.min.js"></script>
<script src="https://drachenwald.sca.org/scripts/calendar.js"></script>

<script>
  grouplist = [ 'Aarnimetsä', 'Nordmark' ]
  $( document ).ready( loadCalendar );
</script>

<table>
<caption><h3>Upcoming Events</h3></caption>
<thead>
<tr valign="top"><th scope="col"><h3>Date</h3></th>
<th scope="col"><h3>Group</h3></th>
<th scope="col"><h3>Event</h3></th>
<th scope="col"><h3>Royal Progress</h3></th></tr>
</thead>
<tbody id="calendar">
<tr><td colspan="4"><i>Calendar is loading...<br>(Internet Explorer is not supported)</i></td></tr>
</tbody>
</table>
{% endhighlight %}

Replace the elements of `grouplist` with the groups whose events you wish to display. (And if you're already using jQuery, you don't need to include that line a second time.)

Webministers in Insulae Draconis can instead use the Principality Calendar:

{% highlight html %}
<script src="https://unpkg.com/papaparse@latest/papaparse.min.js"></script>
<script src="https://insulaedraconis.org/scripts/calendar.js"></script>

<script>
  grouplist = [ 'dun in mara', 'eplaheimr', 'glen rathlin', 'kingeslake' ]
  $( document ).ready( loadCalendar );
</script>

<span id="calendar">
  <p>
  Calendar is loading…<br />
  (Internet Explorer is not supported)
  </p>
</span>
{% endhighlight %}

Again, replace the elements of `grouplist` with the groups of your choice.

Finally, it is this feature which is behind the relaunch of the [Lough Devnaree](https://loughdevnaree.org) website for our groups in Ireland. Lough Devnaree is not a formal group, but it's an important identity for many of our members in the groups there, and one thing that's been missing is a single calendar with all the in-country events in one place. This now appears on the front page of the rebuilt website (which shares its theme and tech with the Drachenwald site.)

Comments, as always, are welcome - especially from webministers, we're always keen to hear of ways we can support you.
