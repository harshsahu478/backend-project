import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  videoFile: {
    type: String,
    required: true,
  },
  owner: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  ],
  duration: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },

},
{
    timestamps: true
});

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = new mongoose.Model("Video", videoSchema);
