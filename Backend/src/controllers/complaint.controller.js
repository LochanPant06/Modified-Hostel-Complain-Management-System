import Complaint from "../models/complaint.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComplaint = asyncHandler(
  async (req, res) => {

    const {
      title,
      description,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !category
    ) {
      return res.status(400).json(
        new ApiResponse(
          400,
          null,
          "All fields are required"
        )
      );
    }

    const complaint =
      await Complaint.create({
        title,
        description,
        category,

        student: req.user._id,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        complaint,
        "Complaint created successfully"
      )
    );
});

const getMyComplaints = asyncHandler(
  async (req, res) => {

    const complaints =
      await Complaint.find({
        student: req.user._id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaints,
        "Complaints fetched successfully"
      )
    );
});

const deleteComplaint = asyncHandler(
  async (req, res) => {

    const { complaintId } =
      req.params;

    const complaint =
      await Complaint.findById(
        complaintId
      );

    if (!complaint) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Complaint not found"
        )
      );
    }

    if (
      complaint.student.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json(
        new ApiResponse(
          403,
          null,
          "You can delete only your own complaints"
        )
      );
    }

    await Complaint.findByIdAndDelete(
      complaintId
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Complaint deleted successfully"
      )
    );
});
const updateComplaintStatus = asyncHandler(
  async (req, res) => {

    const { complaintId } = req.params;

    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
      "Rejected",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json(
        new ApiResponse(
          400,
          null,
          "Invalid status"
        )
      );
    }

    const complaint =
      await Complaint.findById(
        complaintId
      );

    if (!complaint) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Complaint not found"
        )
      );
    }

    complaint.status = status;

    await complaint.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        complaint,
        "Status updated successfully"
      )
    );
});

const getAllComplaints = asyncHandler(
  async (req, res) => {

    const complaints =
      await Complaint.find()
        .populate(
          "student",
          "fullName rollNo hostelName roomNo"
        )
        .sort({
          createdAt: -1
        });

    return res.status(200).json(
      new ApiResponse(
        200,
        complaints,
        "All complaints fetched successfully"
      )
    );
});
export { createComplaint, getMyComplaints, updateComplaintStatus, deleteComplaint, getAllComplaints };

