import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tutorialId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;
