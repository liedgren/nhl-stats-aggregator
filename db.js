// Import path module
const path = require('path')
// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

knex.schema
    .hasTable('matches')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('matches', (table)  => {
          table.increments('id').primary(),
          table.string('teamId'),
          table.string('data')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Matches\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Export the database
module.exports = knex