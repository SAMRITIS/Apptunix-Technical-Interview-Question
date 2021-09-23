module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    movie_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  });
  return Rating;
};
