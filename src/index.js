const express = require("express");
const mysql = require("mysql");

const app = express();

const con = mysql.createConnection({
  host: "remotemysql.com",
  user: "FknqGegRiP",
  password: "fuwfdEq7Sf"
});

const database = "FknqGegRiP";

// =========================================
//      Login
// =========================================

app.get("/login", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `SELECT * FROM usuario WHERE login = '${req.login}' AND senha = '${
      req.senha
    }';`,
    function(error, result) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200,
        result: result
      };
      res.send(JSON.stringify(payload));
    }
  );
});

// =========================================
//      Mutantes
// =========================================

app.get("/mutantes", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `SELECT m.nome, m.foto, GROUP_CONCAT(h.nome SEPARATOR ', ') as habilidades FROM mutante_habilidade as mh INNER JOIN mutante as m on mh.idMutante = m.id INNER JOIN habilidade as h on mh.idHabilidade = h.id GROUP BY idMutante;`,
    function(error, result) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200,
        body: result
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.get("/mutante/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `SELECT m.nome, m.foto, GROUP_CONCAT(h.nome SEPARATOR ', ') as habilidades FROM mutante_habilidade as mh INNER JOIN mutante as m on mh.idMutante = m.id INNER JOIN habilidade as h on mh.idHabilidade = h.id WHERE m.id = ${
      req.params.id
    } GROUP BY idMutante;`,
    function(error, result) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200,
        result: result
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.post("/mutante", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `INSERT INTO mutante(nome, foto) VALUES (${("req.nome", "req.foto")});`,
    function(error) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.put("/mutante/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `UPDATE mutante SET nome = '${req.nome}', foto = '${req.foto}' WHERE id = ${
      req.params.id
    };`,
    function(error, result) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.delete("/mutante/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(`DELETE FROM mutante WHERE id = ${req.params.id}`, function(error) {
    if (error) throw new Error(error);
    const payload = {
      statusCode: 200
    };
    res.send(JSON.stringify(payload));
  });
});

// =========================================
//      Poderes
// =========================================

app.get("/habilidades", (req, res) => {
  con.query(`USE ${database}`);
  con.query("SELECT id, nome, descricao FROM habilidade", function(
    error,
    result
  ) {
    if (error) throw new Error(error);
    const payload = {
      statusCode: 200,
      result: result
    };
    res.send(JSON.stringify(payload));
  });
});

app.get("/habilidade/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(`SELECT * FROM habilidade WHERE id = ${req.params.id};`, function(
    error,
    result
  ) {
    if (error) throw new Error(error);
    const payload = {
      statusCode: 200,
      result: result
    };
    res.send(JSON.stringify(payload));
  });
});

app.post("/habilidade", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `INSERT INTO habilidade(nome, descricao) VALUES ('${(req.nome,
    req.descricao)}');`,
    function(error) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.put("/habilidade/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(
    `UPDATE habilidade SET nome = '${req.nome}', descricao = '${
      req.descricao
    }' WHERE id = ${req.params.id};`,
    function(error, result) {
      if (error) throw new Error(error);
      const payload = {
        statusCode: 200
      };
      res.send(JSON.stringify(payload));
    }
  );
});

app.delete("/habilidade/:id", (req, res) => {
  con.query(`USE ${database}`);
  con.query(`DELETE FROM habilidade WHERE id = ${req.params.id}`, function(
    error
  ) {
    if (error) throw new Error(error);
    const payload = {
      statusCode: 200
    };
    res.send(JSON.stringify(payload));
  });
});

app.listen(8080);
