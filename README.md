# cinnamonweb

> CinnamonHAB WEB UI

## Development

Run

```
docker-compose run   -p 8080:8080 web /bin/bash
npm install
npm run dev
```

Visit [localhost:8080](http://localhost:8080)

*Important*: Be sure to also run [cinnamongui-api](https://github.com/CinnamonHAB/cinnamongui-api) at `http://localhost:3000`


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
