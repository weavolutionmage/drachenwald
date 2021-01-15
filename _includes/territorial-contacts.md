{% assign q = include.listing  %}
{% for item in q %}
{% assign p = item %}
{% assign mundania = "" | split: ', ' %}
{% unless p.mundanename == "" %} {% assign mundania = mundania | push: p.mundanename %} {% endunless %}
{% unless p.pronouns == "" %} {% assign mundania = mundania | push: p.pronouns %} {% endunless %}
{{ p.title }} {{ p.scaname }} {% unless mundania.size < 1 %} ({{  mundania | join: ", "  }}) {% endunless %} <br/> <a href="mailto:{{ p.email }}">{{ p.email }}</a>
{% endfor %}