FROM node:16.11.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn
# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

# start the app
CMD [ "yarn", "dev" ]
