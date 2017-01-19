FROM node:latest

# create app folder
RUN mkdir /app
WORKDIR /app

# install backend
COPY package.json /app
RUN npm install

# copy everything to app
COPY . /app

EXPOSE 3000
CMD ["npm", "start"]