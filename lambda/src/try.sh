#!/bin/bash

node bit.js

var="$(cat foo.txt)"
echo $var

sed -i "s/.*The value has changed.*/        this.emit(':tell', 'The value has changed by $var');/" index.js

sentiment="$(cat result.txt)" 
sed -i "s/.*Hello ! The current.*/        this.emit(':tell', '$sentiment');/" index.js


mkdir -p src
cp index.js src/index.js
rsync -r node_modules src
cd src

zip -r ../src.zip *

cd ..

aws s3 cp src.zip  s3://hackncvivek/


