import Announcement from "../models/Announcement.model.js";





//all users can read announcements, only admin can create announcements
export const getAnnouncements = async (req, res) => {
  const userId = req.user.userId;

  const announcements = await Announcement.find({
    $or: [
      { toUser: null }, // broadcast announcements
      { toUser: userId }, // announcements targeted to this user
      { fromAdmin: userId }, // announcements created by this admin
    ],
  })
    .populate("fromAdmin", "username")
    .populate("toUser", "username") // populate toUser to show who it's targeted to
    .sort({ createdAt: -1 }); //. this -1 will show new announcements first

  res.json(announcements);
};





export const createAnnouncement = async (req, res) => {
  const { content, toUserId } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  const announcement = await Announcement.create({
    content,
    fromAdmin: req.user.userId,
    toUser: toUserId || null,
  });

  // Populate the announcement before emitting
  await announcement.populate("fromAdmin", "username");
  await announcement.populate("toUser", "username"); // populate toUser as well

  // emit via socket
  const io = req.app.get("io");

  if (toUserId) {
    // Send to the targeted user
    io.to(toUserId).emit("new_announcement", announcement);
    // Also send to the admin who created it
    io.to(req.user.userId).emit("new_announcement", announcement);
  } else {
    // Broadcast to everyone
    io.emit("new_announcement", announcement);
  }

  res.status(201).json(announcement);
};
