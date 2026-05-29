#!/bin/bash
# source: https://queil.net/2023/01/hot-reloading-with-busybox-httpd/

echo "Content-Type: text/html"
echo ""

index=$(cat ../index.htm)
inject='
<script type="text/javascript">
    fetch("/cgi-bin/reload.sh").then(() => location.reload());
</script>'

echo -e "${index/<\/title>/"</title>\n    $inject"}"
