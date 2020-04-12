const gamesRoutes = require('./games-routes');
const usersRoutes = require('./users-routes');
const ordersRoutes = require('./orders-routes');
const statisticsRoutes = require('./statistics-routes');

module.exports =  app =>{
    app.use('/api/users/', usersRoutes);
    app.use('/api/games/', gamesRoutes);
    app.use('/api/order', ordersRoutes);
    app.use('/api/statistics/', statisticsRoutes);
}