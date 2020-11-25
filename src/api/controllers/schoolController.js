const School = require('../models/schoolModel');


exports.list_all_schools = (req, res) => {
    School.find({}, (error, schools) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(schools)
        }
    })
}




exports.create_a_school= (req, res) => {
    let new_school = new School(req.body);

    new_school.save((error, school) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(school)

        }
    })
}

exports.get_a_school = (req, res) => {
    School.findById(req.params.school_id, (error, school) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(school)
        }
    })
}

exports.update_a_school= (req, res) => {
    School.findByIdAndUpdate(req.params.school_id, req.body, {
        new: true
    }, (error, school) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(school)
        }
    })
}
exports.delete_a_school = (req, res) => {
    School.findByIdAndRemove(req.params.school_id, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({
                message: "School deleted!"
            })
        }
    })
}