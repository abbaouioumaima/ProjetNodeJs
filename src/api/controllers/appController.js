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


exports.create_an_app = (req, res) => {
    let new_app = new App(req.body);
    new_app.school_id = req.params.school_id;
    new_app.user_id = req.params.user_id;

    new_app.save((error, app) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(app)
        }
    })
}

exports.list_apps_from_school = (req, res) =>   {
    App.find({school_id: req.params.school_id}, (error, apps) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(apps)
        }
    })
}

exports.get_an_app = (req, res) =>  {
    App.find({
        school_id: req.params.school_id,
        user_id: req.params.user_id
    }, (error, app) =>  {
        if(error)   {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(app)
        }
    })
}