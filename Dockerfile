FROM docker.v2.gu.com/nginx:1.11.10
COPY docs/.vuepress/dist /usr/share/nginx/html
