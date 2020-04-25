# node-koa-web-api-template

A full-stack, NodeJS-based, Koa2 based web API template

:smiley: This project is based on [Molunerfinn/vue-koa-demo](https://github.com/Molunerfinn/vue-koa-demo)

## Modification

:fire: Add API Resources Feature, and response helper functions, just like Laravel

:umbrella: Add validation-error-catch feature

:cactus: Upgraded to [Sequelize v5](https://github.com/sequelize/sequelize)

:construction_worker: Add [Element](https://github.com/ElemeFE/element) Framework

:baby: Improved Routes set-ups

:hand: Improved JWT set-ups

## And Also...

It has the following characteristics, because it's based on [Molunerfinn/vue-koa-demo](https://github.com/Molunerfinn/vue-koa-demo) ( :laughing: Thanks for original creator, [PiEgg](https://github.com/Molunerfinn))

:sunny: Easy to setup and learn

:100: Api test coverage

:rocket: Instant feedback

:stuck_out_tongue_winking_eye: Vue SSR support in the [ssr](https://github.com/Molunerfinn/vue-koa-demo/tree/ssr) branch

:tada: Docker support

## Modification Details

#### :fire: API Resources Feature, and response helper functions

In controller, you could easily use `ctx.success` to return success response

Also, you can define your own API Resource in server/resources, and use it to filter returning data

## To-Dos

1. Add more response helper functions, like `fail`, `json` etc.
2. Improve API Resource feature

## Install

`git clone https://github.com/Molunerfinn/vue-koa-demo.git`

`npm install` or `yarn`

if you are using yarn & meet this error:

```bash
error upath@1.0.4: The engine "node" is incompatible with this module. Expected version ">=4 <=9".
```

please use

```
yarn --ignore-engines
```

Also you need to install MySQL & create a database named `todolist`,and execute 2 sql files `list.sql` & `user.sql`.They are in `sql/`

After that, create a `.env` file and set the database username & password:

```env
# your database username
DB_USER=XXXX
# your database
DB_PASSWORD=YYYY
# Koa is listening to this port
PORT=8889
```

If you want to run the test for the Project, please create a `.env.test` file to face this situation:

```env
# your database username
DB_USER=XXXX
# your database
DB_PASSWORD=YYYY
# The port which is listened by koa in the test environment
PORT=8888
```

### Run

> Node.js & Docker support. **You need to create a `.env` file as above**.

### Node.js

Beacuse of using Koa2, `Node.js >= v7.6.0` is needed.

#### Development:

`npm run dev` && `npm run server`

open browser: `localhost:8080`

> tips: login password is 123

#### Production:

`npm run start`

open browser: `localhost:8889`

> tips: login password is 123

#### Test:

`npm run test` and find the coverage report in the `coverage/lcov/index.html`

### Docker

`docker-compose build` && `docker-compose up`

> mysql in docker use 3306 port inside & outside.

open browser: `localhost:8889`

> tips: login password is 123

## License

[MIT](http://opensource.org/licenses/MIT)


