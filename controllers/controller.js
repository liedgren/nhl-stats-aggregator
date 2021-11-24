// Import database
const knex = require('./../db')

exports.saveMatch = (teamId, data) => {

  console.log(teamId);
  console.log(data);

  knex('matches')
    .insert({
        'teamId': teamId, 
        'data': data
      }) 
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getMatches = async (req, res) => {

  const teamId = req.body.teamId;

  knex('matches')
    .select('*') 
    .from('matches') 
    .where('teamId', teamId) 
    .then(result => {      
      returnData = {teamId: teamId, data: JSON.parse(result[0].data)}
      res.json(returnData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving matches: ${err}` })
    })
}

