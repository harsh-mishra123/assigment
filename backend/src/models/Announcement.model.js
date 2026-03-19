import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
   {
    content: {
      type: String,
      required: true,
    },
    fromAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = broadcast
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;






// Announcement can be:

// Broadcast → toUser = null

// Targeted → toUser = userId