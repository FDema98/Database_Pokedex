const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


const db_url = 'mongodb://localhost:27017'
const db_name = 'bd2'
let db

MongoClient.connect(db_url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db(db_name)
  console.log('Connected to MongoDB')
  console.log(`Database: ${db_name}`)
  app.listen(3000, () => console.log('listening on 3000'))
})


app.get('/', (req, res) => {
  db.collection('pokemon').find().toArray().then(results => {
    res.render('pokemon', { pokemon: results })
  })
})

app.post('/search', (req, res) => {
  var name = req.body.name
  db.collection('pokemon').find({
    "Name": {
      $regex: name, $options: 'i'
    }
  }).toArray().then(results => {
    res.render('pokemon', { pokemon: results })
  })
})

app.get('/strongerGeneration', (req, res) => {
  db.collection('pokemon').aggregate([{
    $group: {
      "_id": "$Generation",
      "numPokemon": { "$sum": 1 },
      "numRatings": { "$sum": "$Total" }}},{
    $sort: { "numRatings": -1 } },]).toArray().then(results => {
      db.collection("strongerGeneration").insert(results)
      res.render('generation', { generations: results })
    })
})


app.post('/query', (req, res) => {
  var generation = parseInt(req.body.generation)
  var rating = parseInt(req.body.rating)
  var type1 = req.body.type1
  var type2 = req.body.type2
  var legendary = req.body.legendary

  if (type1 == "all") {
    if (type2 == "all") {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating } }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating } }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      }
    } else if (type2 == null) {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, Type2: null, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, Type2: null }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, Type2: null, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, Type2: null }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      }
    } else {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, Type2: type2, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, Type2: type2 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, Type2: type2, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, Type2: type2 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      }
    }
  } else {
    if (type2 == "all") {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      }
    } else if (type2 == "none") {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1, "Type2": null, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1, "Type2": null }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }
      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1, "Type2": null, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1, "Type2": null }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }

      }
    } else {
      if (generation == 0) {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1, "Type2": type2, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ ["Total"]: { $gte: rating }, "Type1": type1, "Type2": type2 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }

      } else {
        if (legendary != "undefined") {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1, "Type2": type2, "Legendary": legendary }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        } else {
          db.collection('pokemon').find({ "Generation": generation, ["Total"]: { $gte: rating }, "Type1": type1, "Type2": type2 }).toArray()
            .then(results => {
              res.render('pokemon', { pokemon: results })
            })
        }

      }

    }
  }

})
