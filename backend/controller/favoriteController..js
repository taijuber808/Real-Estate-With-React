import User from "../model/user";

export const addFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (user.favorites.includes(id)) {
      return res.status(400).json({
        status: false,
        message: "Property already in favorites",
      });
    }

    user.favorites.push(id);

    await user.save();

    res.status(200).json({
      status: true,
      message: "Property added to favorites",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== id
    );

    await user.save();

    res.status(200).json({
      status: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "favorites"
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Favorites fetched successfully",
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};