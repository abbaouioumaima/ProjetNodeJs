module.exports = (server) => {
    const appController = require('../controllers/appController');

    server.route('/apps')
        .get(appController.list_all_apps);
}