const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const dbName = 'regexdb';
const log = require('./console-log.module');

module.exports = function(req, res) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    mongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
        log.error('Error: connect to db');
        return;
      }

      let user = JSON.parse(data);
  
      db.db(dbName).collection("users").find(user).toArray((err, result) => {
        if (err) {
          db.close();
          res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
          log.error('Error: find user in db');
          return;
        }

        if (!result.length) {
          db.close();
          res.end(JSON.stringify({ status: 'error', message: 'Пользователь с такими данными не зарегистрирован' }));
          log.error('Error: User registered yet');
          return;
        }

        user = {};
        user.id = result[0]._id.toString();
        user.login = result[0].login;

        log.succesful('Successful: user registered!');

        res.end(JSON.stringify({ status: 'ok', data: user }));
        db.close();
      });
    });
  });
}