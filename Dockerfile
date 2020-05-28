FROM node:13.14.0-alpine3.10

#create app directory
RUN mkdir /src
WORKDIR /src

#app source
COPY /code/ /src/

#install app dependencies
RUN npm install 


EXPOSE 80
CMD npm run start