import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Electrical",
        "Plumbing",
        "Internet",
        "Cleaning",
        "Furniture",
        "Other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
