import Property from "../model/Property.js";
import Wishlist from "../model/wishlist.js";

export const addWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    // Check property exists or not
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    // Check already in wishlist
    const existingWishlist = await Wishlist.findOne({
      user: req.user.id,
      property: propertyId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        status: false,
        message: "Property already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      property: propertyId,
    });

    res.status(201).json({
      status: true,
      message: "Property added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in adding wishlist ${error.message}`,
    });
  }
};

// Get My Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("property");

    res.status(200).json({
      status: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getting wishlist ${error.message}`,
    });
  }
};


// Remove from Wishlist
export const removeWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      property: propertyId,
    });

    if (!wishlist) {
      return res.status(404).json({
        status: false,
        message: "Property not found in wishlist",
      });
    }

    res.status(200).json({
      status: true,
      message: "Property removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in removing wishlist ${error.message}`,
    });
  }
};