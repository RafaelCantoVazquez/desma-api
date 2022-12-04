import mongoose from 'mongoose';

const paletteSchema = new mongoose.Schema(
  {
    primaryColors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
    secondaryColors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
    textColors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
    backgroundColors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
    extraColors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Palette = mongoose.model('Palette', paletteSchema);
