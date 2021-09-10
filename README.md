# How I worked on this project

 - My goal was to create a good strong-typed backend structure and to learn MySQL.
 - I tested the endpoints with a http client (Insomnia).

# How to navigate this project

 - The server is a class and it's initialization is run sequencially in the constructor : [Example code](https://github.com/burzacoding/ts-rest-server-sql/blob/master/server.ts).
 - The database and server run with properties only found in environment variables: [Example code](https://github.com/burzacoding/ts-rest-server-sql/blob/master/database/config.ts).
 - The project runs with flags for dev and production environments. [Example code](https://github.com/burzacoding/ts-rest-server-sql/blob/master/index.ts)
 - Some folders feature an index file for better readability of import statements: [Example code](https://github.com/burzacoding/ts-rest-server-sql/blob/master/models/index.ts).

# If I had more time I would change this

 - Create a frontend to better show this project.
 - Improve the overall structure of files for better quality of code and code readability.

# Available Scripts

Please remember to install the dependecies before trying to run the project `npm i`

In the project directory, you can run:
#### `npm run start`

Executes node on the `index.js` file.

#### `npm run prod`

Starts the server on production mode and uses real configuration to connect to production database and use the server port.

#### `npm run dev`

Starts the server using local configuration to connect to a local database with mock data.

#### `npm run watchdev` and `npm run watchprod`

The same as the previous two scripts but using `nodemon` instead of `node`.

#### `start_sv_prod`

Starts the server using production configuration and sets the `mode=force` flag. This is so the server can create mock data to populate it's first-ever run.
