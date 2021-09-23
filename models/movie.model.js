module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movie", {
    movie_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    movie_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Movie;
};
