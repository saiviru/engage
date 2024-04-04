const express = require('express');
const seedRoutes = require('./routes/seedRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', seedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

