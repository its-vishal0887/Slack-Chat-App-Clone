import mongoose from 'mongoose';

// import workSpace from './workspaceSchema';
// import { required } from 'zod/mini';

const messageSchema = new mongoose.Schema({
  body:{
    type:String,
    required:[true, "message body is reqired"]
  },
  image:{
    type:String
  },
  channelId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Chnnel',
    required:[true, 'Channel ID is required']
  },
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true, 'Sender ID is required']
  },
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'WorkSpace',
    required:[true, 'workspace ID is required']
  }
})

const message = mongoose.model('Message', messageSchema);
export default message;