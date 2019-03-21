var db = require("../models");

module.exports = function (app) {
    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // TODO
        // ====
        // Finish the route so it finds one article using the req.params.id,
        // and run the populate method with "note",
        // then responds with the article with the note included
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("comment")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                console.log(dbArticle);
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // TODO
        // ====
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note

        db.Comment.create(req.body).then(function (dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { comment: dbComment._id } }, { new: true })
        }).then(function (dbArticle) {

            res.json(dbArticle)
            console.log(dbArticle);
        })
            .catch(function (err) {
                res.json(err);
            })

    });

    app.delete("/articles/:id", function (req, res) {
        db.Comment.findByIdAndDelete({ _id: req.params.id })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
    });

};