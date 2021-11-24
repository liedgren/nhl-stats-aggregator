// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const cron = require('node-cron');
const axios = require('axios').default;
const {parse, stringify, toJSON, fromJSON} = require('flatted');

// Import routes
const matchRouter = require('./routes/routes')
// Set default port for express app
const PORT = process.env.PORT || 4001

// Create express app
const app = express()
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Implement route
app.use('/api', matchRouter)
// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})
// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

const matchRoutes = require('./controllers/controller.js')

// Start loop to watch NHL API and call CM API

cron.schedule('0 */45 * * * *', () => {

  teamIds = [{ id: '1192', times:'' }];

  teamIds.forEach(function (teamId, index) {

      let url = 'https://proclubs.ea.com/api/nhl/clubs/matches?clubIds='+teamId.id+'&platform=ps5&matchType=gameType5';

      let headers = {
        'accept-language': 'en-US,en;q=0.5',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
        'connection': 'keep-alive',
        'referer': 'www.ea.com'
      };

      axios({
        url: url,
        headers: headers
      })
      .then(function (response) {
        const a = [{}];
        a[0].a = a;
        a.push(a);
        matchRoutes.saveMatch(teamId.id, stringify(response.data));
      })
      .catch(function (error) {
      })
  });

});

// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})


  