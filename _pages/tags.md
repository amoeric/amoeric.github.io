---
layout: single
permalink: /tags/
title: "標籤"
author_profile: true
---

{% if site.tags.size > 0 %}
  <div class="tags">
    {% for tag in site.tags %}
      <div class="tag-group">
        <h3 id="{{ tag[0] | slugify }}" class="tag-group-title">{{ tag[0] }}</h3>
        <ul class="tag-group-list">
          {% for post in tag[1] %}
            <li class="tag-group-item">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              <span class="tag-group-date">{{ post.date | date: "%Y-%m-%d" }}</span>
            </li>
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  </div>
{% else %}
  <p>目前還沒有標籤。</p>
{% endif %}
