---
title: Using the Drachenwald calendar
excerpt: For event stewards, chroniclers and webministers
---

What happens when you submit an event
=====================================

When you submit an event using the Google Form, it will appear on the Kingdom Calendar within a few minutes, with a note that it has not yet been approved as an official event by the Chronicler. 

Within a day, you'll also receive an email with a link to edit your submission. Whenever you make changes, they'll be reflected on the calendar immediately, and the Kingdom Chronicler (as well as your regions Chronicler, for some regions) will be notified.

You don't have to fill in all of the details right away. If you have asked that your event be listed as an official event in the Dragon's Tale, then the email will let you know about any blank fields which will need to be filled in before the Chronicler can approve the event. The Chronicler might also contact you personally if they need further information on something.

While the Dragon's Tale requires that event announcements are written in English, the form has optional support to provide information in the language of your group. If you've provided this information, and someone is browsing the calendar in that language, then the calendar will show that information instead of the English translation.


Embedding the calendar in your website
======================================

If you run the website of an official group in Drachenwald, you're welcome to embed the Kingdom calendar in the website. This can be done by adding this code to a web page:

{% highlight html %}
<div id="calendar"></div>
<script type="text/javascript"
        src="https://scripts.drachenwald.sca.org/calendar/v3.0/calendar.js">
</script>
{% endhighlight %}

You can configure the behaviour of the calendar by adding parameters to the `<div>`. For example,
`<div id="calendar" region="nordmark">` shows only those events that take place in Nordmark.

The parameters you may add are:

- `region` Shows only events from this region. May be `region="aarnimetsä"`, `region="central"`, `region="id"`, `region="nordmark"`, or `region="southern"`.
- `group` A list of group names, comma separated and in lower case. Shows only events from this set of groups. For example, `group="dun in mara,eplaheimr,glen rathlin,kingeslake"`
- `count` Show only this number of events.
- `legend="true"` Show the legend and the option to show/hide cancelled events.
- `links` By default, event names link to their event pages on the Kingdom website.

  `links="none"` suppresses the links.

  `links="local"` causes them to open on the local website. This is only suitable if you have no other content on the calendar page, as the calendar (and not the rest of the content) will be replaced by information for one event.
- `localevents="none"` Show only those events which have been submitted to the Kingdom Chronicler for publication in the Dragons Tale.
- `onlineevents="none"` Do not show any events marked as taking place online.
- `progress` By default, the Royal Progress is shown for the King and Queen. Set to `progress="id"` to show the Progress of the Prince and Princess of Insulae Draconis instead. If you are a Principality or Baronial webminister and would like your Progress to be listed, please get in touch with the Kingdom webminister.
- `lang` Sets the default language to use for the calendar; and if information for an event is provided in that language, it will be used in preference to the information in English.

  At this time, the settings may be `lang="en"` or `lang="sv"`. Finnish and German are also being translated.

The script doesn't import any specific styling; it'll use whatever defaults you have set up for your own website. You can use CSS to style the buttons and the table if you wish, by defining certain classes:

- `btn` is set on all buttons
- `btn--primary` is set on buttons which can be selected
- `bin--inverse` is set on the currently selected button
- The backgrounds of events on the calendar itself are specifically set to white or grey using inline styling
- Cells in the calendar table have a `data-label` which may be used in responsive designs

Please drop a note to the Kingdom webminister so that the web team knows you are using the calendar, and can support you with any changes.