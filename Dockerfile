FROM node:latest

# create app folder
RUN mkdir /app
WORKDIR /app

# create uploads folder
RUN mkdir /app/uploads

# install backend
ADD package.json /app/
RUN npm install

ADD gulpfile.js /app/
ADD ./tasks /app/tasks
RUN npm install gulpjs/gulp-cli -g

# copy everything to app
ADD . /app/

# install front-end
RUN npm install -g bower 
RUN gulp build
RUN cd ./front-end/ && bower install --allow-root

EXPOSE 3000
# CMD ["npm", "start"]

