const db = require('./connect');

module.exports = function (app) {
  app.get('/store', (req, res) => {
    db.query('SELECT * FROM store', (error, response) => {
      const formResponse = {
        status: 200,
        data: response,
      };
      if (error) {
        console.log(error);
      } else {
        res.json(formResponse);
      }
    });
  });
  app.get('/store/s/:title', (req, res) => {
    const title = req.params.title;
    db.query('SELECT * FROM store WHERE title =?', [title],
      (error, response) => {
        const formResponse = {
          status: 200,
          data: response,
        };
        if (error) {
          console.log(error);
        } else {
          res.json(formResponse);
        }
      })
  });
  app.post('/store', (req, res) => {
    const title = req.body.title;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const branch = req.body.branch;
    db.query(
      'INSERT INTO store SET title=?, type=?, quantity=?, branch=?',
      [title, type, quantity, branch],
      (error, response) => {
        const formResponse = {
          status: 202,
          data: response,
        };
        if (error) {
          console.log(error);
        } else {
          res.json(formResponse);
        }
      }
    );
  });
  app.delete('/store/:id', (req, res) => {
    const id = req.params.id;
    console.log(typeof id, id);
    db.query(
      'DELETE FROM store WHERE id=?',
      [id],
      (error, response) => {
        const formResponse = {
          status: 200,
          data: response,
        };
        if (error) {
          console.log(error);
        } else {
          res.send('Berhasil Dihapus');
        }
      }
    );
  });
  app.put('/store/', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const branch = req.body.branch;
    db.query(
      'UPDATE store SET title =?, quantity=? WHERE store.id =?;',
      [title, type, quantity, branch, id],
      (error, response) => {
        const formResponse = {
          status: 200,
          data: response,
        };
        if (error) {
          console.log(error);
        } else {
          res.send('Berhasil Diedit');
        }
      }
    );
  });
  app.get('/store/type/:type', (req, res) => {
    const type = req.params.type;
    db.query('SELECT * FROM store WHERE type =?', [type],
      (error, response) => {
        const formResponse = {
          status: 200,
          data: response,
        };
        if (error) {
          console.log(error);
        }
        if (response.length === 0) {
          res.send("Not Found")
        } else {
          res.json(formResponse);
        }
      })
  });
  app.get('/store/branch/:branch', (req, res) => {
    const branch = req.params.branch;
    db.query('SELECT * FROM store WHERE branch =?', [branch],
      (error, response) => {
        const formResponse = {
          status: 200,
          data: response,
        };
        if (error) {
          console.log(error);
        }
        if (response.length === 0) {
          res.send('Not found')
        } else {
          res.json(formResponse)
        }

      })
  });
};