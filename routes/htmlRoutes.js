var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        db.Article.find({})
            .then(function (dbArticle) {
                var hbsobject = {
                    article: dbArticle
                };
                res.render("scrape", hbsobject)
            });
        axios.get("http://www.espn.com/nba/team/_/name/utah/utah-jazz").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            var result = {};
            // Now, we grab every h2 within an article tag, and do the following:
            $("div.item-info-wrap").each(function (i, element) {
                // Save an empty result object

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(element).find("h1").text();
                result.link = $(element).find("h1").find("a").attr("href");
                result.summary = $(element).find("p").text();

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
                console.log(result);
            });

            // Send a message to the client
        });
    });
    app.get("/", function (req, res) {
        db.Article.find({})
            .populate("comment")
            .then(function (dbArticle) {
                console.log(dbArticle);
                var hbsobject = {
                    article: dbArticle
                };
                res.render("index", hbsobject)
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};