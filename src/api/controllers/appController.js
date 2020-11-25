const App = require('../models/appModel');


exports.list_all_apps = (req, res) => {
    App.find({}, (error, apps) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(this.list_all_apps)
        }
    })
}
