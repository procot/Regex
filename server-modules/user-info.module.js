const mongoClient = require('mongodb').MongoClient,
      mongoUrl = 'mongodb://localhost:27017',
      objectId = require('mongodb').ObjectId,
      dbName = 'regexdb';

module.exports = function(req, res) {
  const id = querystring.parse(url.parse(req.url).query)._id;
	mongoClient.connect(mongoUrl, (err, db) => {
		if (err) {
			res.end(JSON.stringify({ status: 'error', message: 'Error missing get user info' }));
			return;
		}
		db.db(dbName).collection('users').find({'_id': objectId(id) }).toArray((err, result) => {
			if (err || !result.length) {
				res.end(JSON.stringify({ status: 'error', message: 'Error missing get user info' }));
				db.close();
				return;
			}
			delete result[0]._id;
			delete result[0].password;
			res.end(JSON.stringify({ status: 'ok', data: result[0] }));
		});
	});
}