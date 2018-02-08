const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const dbName = 'regexdb';

module.exports = function(req, res) {
  let data = '';

  req.on("data", chunk => {
    data += JSON.parse(chunk);
  });

  req.on("end", () => {
    mongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
        return err;
      }

      let user = JSON.parse(data);

      db.db(dbName).collection("users").find(user).toArray((err, result) => {
        if (err) {
          res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
          db.close();
          return err;
        }

        if (result.length) {
          res.end(JSON.stringify({ status: 'error', message: 'Пользователь с такими данными уже зарегистрирован' }));
          db.close();
          return;
        }

        user.status = 'Новичок';
        user.countWrong = 0;
        user.countCompleted = 0;
        user.results = [];
        user.id = result[0]._id.toString();

        db.db(dbName).collection("users").insertOne(user, (err, result) => {
          if (err) {
            res.end(JSON.stringify({ status: 'error', message: 'Произошла ошибка на сервере. Повторите попытку снова' }));
            db.close();
            return;
          }

          res.end(JSON.stringify({ 
            status: 'ok', 
            data: { 
              id: result[0]._id.toString(),
              login: result[0].login
            }
          }));
        });
      });				
    });
  });
}