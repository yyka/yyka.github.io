#!/bin/sh
# source: https://queil.net/2023/01/hot-reloading-with-busybox-httpd/

watch -d -t -g -n 1 "ls -lR --full-time ../ | sha1sum"

echo "Content-Type: text/html"
echo ""
echo "OK"
