const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');

const port = 3000;
const clientsRoutes = require('../express-server/routes/clientRoutes');
const propertiesRoutes = require('../express-server/routes/propertyRoutes');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/cadastroPessoa', (req, res) => { 
  console.log(req.body);
  res.send('Pessoa cadastrada com sucesso!');
});

app.use('/api/clients', clientsRoutes);
app.use('/api/properties', propertiesRoutes);

app.get('/', (req, res) => { res.render('index'); });
app.get('/cadastroPessoa', (req, res) => { res.render('cadastroPessoa'); });
app.get('/cadastroImovel', (req, res) => { res.render('cadastroImovel'); });
app.get('/consultaPessoa', (req, res) => { res.render('consultaPessoa'); });
app.get('/consultaImovel', (req, res) => { res.render('consultaImovel'); });
app.get('/iptu', (req, res) => { res.render('iptu'); });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});