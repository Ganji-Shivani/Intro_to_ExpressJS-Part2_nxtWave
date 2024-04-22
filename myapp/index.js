const express = require('express')
const path = require('path')

const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const app = express()

const dbpath = path.join(__dirname, 'goodreads.db')

let db = null
const initializerDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Starting Server  http://localhost:3000/')
    })
  } catch (e) {
    console.log(`db Error: ${e}`)
    process.exit(1)
  }
}
initializerDBAndServer()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})