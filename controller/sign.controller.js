const db = require("../models");
// Import Db object
const Movie = db.movie;
const Rating = db.rating;
const Sequelize = require("sequelize");

// Controller for add new movie
exports.createmovie = async (req, res) => {
  try {
    if (req.body.movie_name) {
      let response = await Movie.create({ movie_name: req.body.movie_name });
      res.status(201).send(response);
    } else {
      res
        .status(400)
        .send({ message: "Send all required Data in proper format" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occoured" });
  }
};

// Controller for add new comment
exports.addcommentrating = async (req, res) => {
  try {
    if (
      req.body.comment &&
      req.body.movie_id &&
      req.body.rating >= 0 &&
      req.body.rating <= 5
    ) {
      let response = await Rating.create({
        email: req.body.email,
        movie_id: req.body.movie_id,
        comment: req.body.comment,
        rating: req.body.rating,
      });
      res.status(201).send(response);
    } else {
      res
        .status(400)
        .send({ message: "Send all required Data in proper format" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occoured" });
  }
};

// Total Rating
exports.totalrating = async (req, res) => {
  try {
    if (req.query.movie_id) {
      let response = await Rating.findAndCountAll({
        where: { movie_id: req.query.movie_id },
        attributes: [
          [
            Sequelize.fn("AVG", Sequelize.col("rating")),
            "avg_rating_of_given_movie",
          ],
          [
            Sequelize.fn("sum", Sequelize.col("rating")),
            "sum_rating_of_given_movie",
          ],
        ],
      });
      res.status(200).send(response);
    } else {
      let response = await Rating.findAndCountAll({
        attributes: [
          [
            Sequelize.fn("AVG", Sequelize.col("rating")),
            "avg_rating_of_all_movie",
          ],
          [
            Sequelize.fn("sum", Sequelize.col("rating")),
            "sum_rating_of_all_movie",
          ],
        ],
      });
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occoured" });
  }
};

//  All Comments and ratings including sorting
exports.allcomment = async (req, res) => {
  try {
    if (req.query.movie_id && req.query.page_no) {
      var data = await Rating.findAndCountAll({
        where: { movie_id: req.query.movie_id },
        include: {
          model: Movie,
          attributes: ["movie_name"],
        },
        order: [["rating", "ASC"]],
        offset: (req.query.page_no - 1) * 2,
        limit: 2,
      });
      res.status(200).send(data);
    } else if (req.query.page_no) {
      var data = await Rating.findAndCountAll({
        include: {
          model: Movie,
          attributes: ["movie_name"],
        },
        order: [["rating", "ASC"]],
        offset: (req.query.page_no - 1) * 2,
        limit: 2,
      });
      res.status(200).send(data);
    } else {
      res
        .status(400)
        .send({ message: "Send all required Data in proper format" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occoured" });
  }
};
