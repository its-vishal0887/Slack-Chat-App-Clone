import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is Reqired'],
      unique: [true, 'Email is already existe'],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Username already exists'],
      match: [
        /^[a-zA-Z0-9_-]{3,16}$/,
        'Username must contain only letters and numbers'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function saveUser() {
  if (this.isModified('password')) {
    const SALT = await bcrypt.genSalt(9);

    this.password = await bcrypt.hash(this.password, SALT);
  }

  this.avatar = `https://robohash.org/${this.username}`;
});

const User = mongoose.model('User', userSchema);

export default User;
