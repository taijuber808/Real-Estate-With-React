import Property from "../model/property.js";

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

    const data = await Property.create({
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
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in creating property ${error.message}`,
    });
  }
};

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

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (bedrooms) {
      filter.bedrooms = Number(bedrooms);
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

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

export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    const data = await Property.findById(id).populate(
      "owner",
      "name email phone",
    );

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Property fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in getting property ${error.message}`,
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    if (
      property.owner.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to update this property",
      });
    }

    const data = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: true,
      message: "Property updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error in updating property ${error.message}`,
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Property id is required",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        status: false,
        message: "Property not found",
      });
    }

    if (
      property.owner.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        status: false,
        message: "You are not allowed to delete this property",
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
