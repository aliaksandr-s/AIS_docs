#!/bin/bash

npm install

gulp clean
gulp build

cd ./front-end/ && bower install
cd ..

docker-compose build
docker-compose up

