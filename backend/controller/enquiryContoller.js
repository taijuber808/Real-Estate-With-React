import Enquiry from "../model/enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const { owner, property, message } = req.body;

    const enquiry = await Enquiry.create({
      user: req.user.id,
      owner,
      property,
      message,
    });

    res.status(201).json({
      status: true,
      message: "Enquiry sent successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getOwnerEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      owner: req.user.id,
    })
      .populate("user", "name email phone")
      .populate("property", "title price location");

    res.status(200).json({
      status: true,
      message: "Enquiries fetched successfully",
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
