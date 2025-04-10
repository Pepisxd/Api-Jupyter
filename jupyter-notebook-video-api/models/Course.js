const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  duration: { type: String },
  completed: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  videoUrl: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String },
});

const CourseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    lessons: [LessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
