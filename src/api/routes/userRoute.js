module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.route('/users')
        .get(userController.list_all_users);

    server.route('/users/:user_id')
        .get(userController.get_an_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);

    server.route('/users/register')
        .post(userController.create_an_user);

    server.route('/users/login') // req.params.user_id
        .post(userController.login_an_user);
}