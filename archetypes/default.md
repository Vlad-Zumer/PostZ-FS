+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
lastmod = {{ .Date }}
draft = true

# Taxonomies
{{- range $taxonomy, $terms := .Site.Taxonomies }}
{{$taxonomy}} = []
{{- end }}

seo-tags = []

summary = ''
+++
