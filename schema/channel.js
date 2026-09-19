import mongoose from 'mongoose';
// import { required } from 'zod/mini';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is reqired']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model("Chnnel", channelSchema);
export default Channel;
