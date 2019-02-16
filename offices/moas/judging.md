---
title: Arts & Sciences Judging Criteria
---
{% assign criteria = site.pages | where_exp: "item", "item.path contains 'offices/moas/judging-criteria/'" %}

### Judging forms

* [Minimum documentation form]({{ site.baseurl }}{% link offices/moas/minimum-documentation-form.html %})

### Categories

(in alphabetical order of field)

{% for item in criteria %}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }})
{% endfor %}