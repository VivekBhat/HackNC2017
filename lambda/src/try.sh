#!/bin/bash

node bit.js
var="$(cat foo.txt)"
echo $var
sed -i -dummy "s/.*tell.*/        this.emit(':tell', 'The value has changed by $var percent');/" index2.js
# sed -i -dummy "s/.*MYSQL_ROOT_PASSWORD.*/      MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD/" docker-compose.yml

rm -rf docker-compose.yml-dummy