# node-koa-web-api-template

A full-stack, NodeJS-based, Koa2 based web API template

:smiley: This project is based on [Molunerfinn/vue-koa-demo](https://github.com/Molunerfinn/vue-koa-demo)

#### Menus
 - [Modifications](https://github.com/Y2Nk4/node-koa-web-api-template#modification)
 - [Install](https://github.com/Y2Nk4/node-koa-web-api-template#Install)
 - [To-Dos](https://github.com/Y2Nk4/node-koa-web-api-template#to-dos)
 - [License](https://github.com/Y2Nk4/node-koa-web-api-template#to-dos)
 - [Database Migrate](https://github.com/Y2Nk4/node-koa-web-api-template#databse-migrate)

## Modifications

Supported CORS

:fire: Add API Resources Feature, and response helper functions, just like Laravel

:umbrella: Add validation-error-catch feature

:cactus: Upgraded to [Sequelize v5](https://github.com/sequelize/sequelize)

:baby: Improved Routes set-ups

:hand: Improved JWT set-ups

### And Also...

It has the following characteristics, because it's based on [Molunerfinn/vue-koa-demo](https://github.com/Molunerfinn/vue-koa-demo) ( :laughing: Thanks for original creator, [PiEgg](https://github.com/Molunerfinn))

:sunny: Easy to setup and learn

:100: Api test coverage

:rocket: Instant feedback

:tada: Docker support

### Modification Details

#### :fire: API Resources Feature, and response helper functions

In controller, you could easily use `ctx.success` to return success response

Also, you can define your own API Resource in server/resources, and use it to filter returning data

## Install

`git clone https://github.com/Y2Nk4/node-koa-web-api-template.git`

`npm install` or `yarn`

if you are using yarn & meet this error:

```bash
error upath@1.0.4: The engine "node" is incompatible with this module. Expected version ">=4 <=9".
```

please use

```
yarn --ignore-engines
```

After that, create a `.env` file and set the environmental configurations:

```env
# your database username
DB_USER=XXXX
# your database
DB_PASSWORD=YYYY
# Koa is listening to this port
PORT=8889
```

Or you can copy/paste the `.env.example` file, and rename it to `.env`

### Run

> Node.js & Docker support. **You need to create a `.env` file as above**.

### Node.js

Because of using Koa2, `Node.js >= v7.6.0` is needed.

#### Development:

`npm run dev` && `npm run server`

use `npm run lint-nodemon` to run nodemon with ESLint

open browser: `localhost:8080`

#### Production:

`npm run start`

open browser: `localhost:8889`

#### Test:

`npm run test` and find the coverage report in the `coverage/lcov/index.html`

### Docker

`docker-compose build` && `docker-compose up`

> mysql in docker use 3306 port inside & outside.

open browser: `localhost:8889`

> tips: login password is 123

## Databse Migrate
In order to manage the database in a better way, migration is now supported.
It's based on Sequelize Cli, and it's configured to adapt with this project.

#### 1.1 To create a new migrations
```
npx sequelize-cli migration:generate --name create_example_migration
```
This command will create a new migration in `PROJECT_DIR/server/migrations`

About how to use Migrations, you should check this [document from sequelize-cli](https://sequelize.org/master/manual/migrations.html)

#### 1.1 To create a model via command line **(not recommended)**
#### Via simple script
Here is a command to generate a model that fits in this project:
```shell script
node scripts\gen_model.js -m TestTable -t table_name
```
```shell script
Usage: node scripts\gen_model.js [options]

Options:
  -V, --version         output the version number
  -m, --model <string>  Name of the model you want to create
  -t, --table <string>  Name of the table you want to bind your model to
  -h, --help            display help for command
```
Note: The template of the model is on '{project_dir}/script/
templates/gen_model.template'

You can modify it to whatever you want

#### Via sequelize-cli
Although I don't recommend you to create a model via sequelize cli,
you can still use `npx sequelize-cli model:generate` to create a model like this:
```
npx sequelize-cli model:generate --name create_example_migration --attributes ...
```
This command will create a new migration in `PROJECT_DIR/server/migrations`,
and a Model file in `PROJECT_DIR/server/models`

Again, it's not recommended right now since the project wasn't designed to use
`sequelize-cli` originally, but I will try to make it work in the future versions.
Instead, you should check the example models to define your own models.

#### 2. Migrate
```shell script
npx sequelize-cli db:migrate
```
To rollback
```shell script
sequelize-cli db:migrate:undo
```
Or to rollback a specific migration
```shell script
db:migrate:undo --name {{migration_file_name}}.js
```

## To-Dos

1. Add more response helper functions, like `fail`, `json` etc.
2. Improve API Resource feature
3. Create models via `sequelize-cli`

## Change Logs
Change Logs started since v1.0.1, all the works before are some basic works.

`v1.0.2`
 - Supported CORS, now you can set the cors origin in the `.env` file

`v1.0.1`
 - Supported using migrations (based on Sequelize Cli)

`v1.0.2`
 - Supported using add Model via command line (based on commander.js & string-template)


## License

[MIT](http://opensource.org/licenses/MIT)
