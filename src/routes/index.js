const gamesRoutes = require('./games-routes');
const usersRoutes = require('./users-routes');

module.exports =  app =>{
    app.use('/api/users/', usersRoutes);
    app.use('/api/games/', gamesRoutes);
}