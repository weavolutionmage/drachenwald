---
title:  "Building on 20 years of work"
date:   2019-04-19 20:00:00 +0100
tags: webartificers
category: news
author: sela
---
It’s three weeks since the launch of the new site, and the changes haven’t stopped. We’ve been busy, and so have you. We’re really thrilled with the contributions, corrections, and feedback. And we’ve also been working on the things that need to happen post-launch to make sure everything goes smoothly into the future. We’d like to tell you about some of these things.

# Archiving the old site

This is in many ways the third major revision of the Drachenwald website. The first was set up [around 2001](http://web.archive.org/web/20010927185927/http://www.drachenwald.sca.org/). The second version was based on Drupal, installed in 2009 ([we found the post](http://web.archive.org/web/20101228035649/http://www.drachenwald.sca.org/node/1)), and has been serving us diligently since then.

Drupal was a great choice for the needs of the Kingdom as the site became bigger and more important - in particular, it allowed many people to log in and make edits.

The internet has changed, though, and it is in many ways a less welcoming place. When you run Drupal, or Wordpress, or any other web application, miscreants are constantly testing its weak points. This happens so much that [Drupal has announcements](https://www.pcworld.com/article/2841372/drupal-if-you-werent-quick-to-patch-assume-your-site-was-hacked.html) which require sites to upgrade within _hours._

Clearly we can’t put a team of system administrators on 24 hour call for our website. So we’ve copied off the old website, disabled Drupal, and... then what?

# Recording our history

This left us with a little bit of a dilemma, because there is a huge amount of information on the old site, not all of which is relevant for today - but we wouldn’t like to lose it.

What we did was to take a snapshot of the raw HTML pages from the old site, and [make them available in an archive](https://sca-drachenwald.gitlab.io/archive/). When someone tries to reach one of the old pages, we redirect them to the archive (with a few exceptions, like the calendar, where we know we can serve the fresh version.)

![Archive site banner screenshot]({% link images/posts/archive-banner.jpg %})

Drupal is no longer there, so these archived pages are static; the only significant changes we made were to place an informational banner at the top, and to tag the pages so that they will, in time, drop out of search engines. This is to make sure that prospective members who are searching won’t get outdated info.

# Zapping broken links

With that done, we know that anything still missing on the new site needs attention. We use Google Analytics to measure the site, and one thing it can tell us is when someone hits a dreaded 404 Not Found.

When this happens, the information we need is: what URL were they trying to access, and what URL sent them there? Google can tell us both.

![404 zapper screenshot]({% link images/posts/404-zapper.jpg %})

Drachenwald has an absolutely enormous number of inbound links, some dating back well over a decade. This is a gift, and we do what we can to make sure that anyone following these links gets at least something useful, if not precisely what was originally there in 2008.

# A cast of thousands

...which is all quite a lot of work.

So we have been absolutely thrilled to discover that we’re not doing this alone.

Many of you have raised issues via our website-issues address. This is great - they go straight into the same [list of issues](https://gitlab.com/sca-drachenwald/sca-drachenwald.gitlab.io/issues) that we’re working from, and it makes it very easy for us to make sure we’re not losing track.

Some of you have gone further and found this:

![Edit this page on gitlab screenshot]({% link images/posts/edit-this-page-on-gitlab.png %}){: .align-center}

This is at the bottom of every page, and when you click through, it can be quite intimidating. Gitlab is, after all, a tool for software developers, and there’s a lot of power there. But it turns out that you don’t need to be technical to use it.

We’ve had feedback from several contributors that, once they got over the initial shock of all these buttons, GitLab tended to guide them to where they wanted to be. We’ve had [a number of people](https://gitlab.com/sca-drachenwald/sca-drachenwald.gitlab.io/graphs/staging) submit their exact changes in Markdown (which is [just like writing an email](https://daringfireball.net/projects/markdown/)) and we were able to merge them right into the main site.

We could not be happier about this. You don’t have to do this to request changes, but the capability is there if you would like to try.

And we also want to acknowledge those who have prepared and curated galleries of high quality photos. It is a delight to have talented photographers offer their photos; it is truly a gift when they take the time to select and categorise them for us. We thank you, from the bottom of our hearts. Expect to see this beautiful work on the site very very soon.

The site is open source; if you would like to get your teeth into downloading it to your own computer and submitting patches, Sela would be very very happy to talk you through it.

And whether you contribute through merge requests, sending photos, opening issues or enjoying the site that we’ve built, together -- thank you, and here’s to another decade of Drachenwald.
