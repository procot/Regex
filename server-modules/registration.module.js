const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const dbName = 'regexdb';
const log = require('./console-log.module');

module.exports = function(req, res) {
  let data = '';

  req.on("data", chunk => {
    data += chunk;
  });

  req.on("end", () => {
    mongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
        log.error('Error: connect to db');
        return;
      }

      let user = JSON.parse(data);

      db.db(dbName).collection("users").find(user).toArray((err, result) => {
        if (err) {
          res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
          db.close();
          log.error('Error: find user in db');
          return err;
        }

        if (result.length) {
          res.end(JSON.stringify({ status: 'error', message: 'Пользователь с такими данными уже зарегистрирован' }));
          db.close();
          log.error('Error: User don\'t registered');
          return;
        }

        user.status = 'Новичок';
        user.countWrong = 0;
        user.countCompleted = 0;
        user.results = [];

        db.db(dbName).collection("users").insertOne(user, (err, result) => {
          if (err) {
            res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
            db.close();
            log.error('Error: insert user into db');
            return;
          }

          res.end(JSON.stringify({ 
            status: 'ok', 
            data: { 
              id: result.ops[0]._id.toString(),
              login: result.ops[0].login
            }
          }));
          db.close();
          log.succesful('Successful: user inserted into db');
        });
      });				
    });
  });
}