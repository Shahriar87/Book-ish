module.exports = function (app, express) {

    require('../models');

    // ---- Importing favourites
    const Favorite = require('../favorite');

    const router = express.Router();

    // ---- Initialize API
    router.get('/api', function (req, res) {
        res.send('API initialized');
    })
    // ---- Register API routes
    app.use('/api', router);

    // ---- Route for all records in collection
    router.route('/favorites').post(function (req, res) {
        // ----- Creating favourite entry
        const favorite = new Favorite();
        favorite.title = req.body.title,
            favorite.authors = req.body.authors,
            favorite.rating = req.body.rating,
            favorite.publisher = req.body.publisher,
            favorite.publishedDate = req.body.publishedDate,
            favorite.description = req.body.description,
            favorite.thumbnail = req.body.thumbnail,
            favorite.price = req.body.price,
            favorite.purchase = req.body.purchase;

        favorite.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Favorite added',
                    favorite: favorite
                });
            }
        })
    })

        // ---- GET call to find all entry
        .get(function (req, res) {
            Favorite.find(function (err, favorites) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(favorites);
                }
            });
        })

    router.route('/favorites/:id')
        // ---- DELETE call to delete an entry
        .delete(function (req, res) {
            Favorite.remove({ _id: req.params.id }, function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Record Removed");
                }
            })
        })

};