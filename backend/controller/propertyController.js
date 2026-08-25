import Property from "../model/Property.js";

// =========================
// CREATE PROPERTY
// Owner Only
// =========================
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      location,
      city,
      area,
      bedrooms,
      bathrooms,
      areaSize,
      images,
    } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      propertyType,
      location,
      city,
      area,
      bedrooms,
      bathrooms,
      areaSize,
      images,
      owner: req.user.id,
    });

    res.status(201).json({
      status: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in creating property ${error.message}`,
    });
  }
};

// =========================
// GET ALL PROPERTIES
// Public
// =========================
export const getProperties = async (req, res) => {
  try {
    const {
      search,
      city,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // City
    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    // Property Type
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    // Bedrooms
    if (bedrooms) {
      filter.bedrooms = Number(bedrooms);
    }

    // Price
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    const sortOption = {};

    if (sort) {
      sortOption[sort] = order === "desc" ? -1 : 1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filter)
      .populate("owner", "name email phone")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      status: true,
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getting properties ${error.message}`,
    });
  }
};

// =========================
// GET SINGLE PROPERTY
// Public
// =========================
export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    const property = await Property.findById(id).populate(
      "owner",
      "name email phone",
    );

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getting property ${error.message}`,
    });
  }
};

// =========================
// UPDATE PROPERTY
// Owner + Own Property Only
// =========================
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    // Find property
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    // Check property owner
    if (property.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: false,
        message: "You can only edit your own property",
      });
    }

    const {
      title,
      description,
      price,
      propertyType,
      location,
      city,
      area,
      bedrooms,
      bathrooms,
      areaSize,
      images,
      status,
    } = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        propertyType,
        location,
        city,
        area,
        bedrooms,
        bathrooms,
        areaSize,
        images,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("owner", "name email phone");

    res.status(200).json({
      status: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in updating property ${error.message}`,
    });
  }
};

// =========================
// DELETE PROPERTY
// Owner + Own Property Only
// =========================
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    // Find property
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    // Check property owner
    if (property.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: false,
        message: "You can only delete your own property",
      });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in deleting property ${error.message}`,
    });
  }
};
