const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

// Rota para listar os registros
app.get('/', (req, res) => {
    connection.query(`INSERT INTO people(name) values('Rafael')`)
    
    connection.query('SELECT name FROM people', (error, results) => {
        if (error) {
            return res.status(500).send('Erro na consulta: ' + error);
        }

        // Monta a string HTML com cabeçalhos e registros
        let html = `
            <h1>Full Cycle Rocks!</h1>
            <h2>People</h2>
        `;

        html += results.map(row => `<p>${row.name}</p>`).join('');

        res.send(html);
    });
});

app.listen(port, ()=>{
    console.log('Rodando na porta ' + port)
})