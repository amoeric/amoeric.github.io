---
layout: single
permalink: /categories/
title: "分類"
author_profile: true
---

{% if site.categories.size > 0 %}
  <div class="categories">
    {% for category in site.categories %}
      <div class="category-group">
        <h3 id="{{ category[0] | slugify }}" class="category-group-title">{{ category[0] }}</h3>
        <ul class="category-group-list">
          {% for post in category[1] %}
            <li class="category-group-item">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              <span class="category-group-date">{{ post.date | date: "%Y-%m-%d" }}</span>
            </li>
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  </div>
{% else %}
  <p>目前還沒有分類。</p>
{% endif %}
