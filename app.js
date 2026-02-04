const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const setupSwagger = require('./swagger/swagger');
const cors = require('cors');
dotenv.config();
const talentRoutes = require('./routes/talent.route');
// const customerRoutes = require('./routes/customerRoute');
// const carRoutes = require('./routes/carRoute');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

setupSwagger(app);

// Routes --------->

// userRouter ----->

app.use('/api', talentRoutes);

// customerRouter ------>

// app.use('/api', customerRoutes);

// carRoutes ------>

// app.use('/api', carRoutes);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
