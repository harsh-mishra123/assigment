import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(

  
  {
    action: {
      type: String,
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    performedByUsername: {
      type: String,
      required: true,
    },
    performedByRole: {
      type: String,
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetUsername: {
      type: String,
      required: true,
    },
    targetRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;