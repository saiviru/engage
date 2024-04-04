const express = require('express');
const seedRoutes = require('./routes/seedRoutes');
var bodyParser = require('body-parser');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Routes
app.use('/api', seedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

