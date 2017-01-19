FROM node:latest

# create app folder
RUN mkdir /app
WORKDIR /app

# create uploads folder
RUN mkdir /app/uploads

# install backend
ADD package.json /app/
RUN npm install

# copy everything to app
ADD . /app/

# install front-end
RUN npm install -g bower 
RUN cd ./front-end/ && bower install --allow-root

EXPOSE 3000
CMD ["npm", "start"]

