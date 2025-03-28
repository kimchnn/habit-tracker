import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      dateJoined: {
        type: Date,
        default: Date.now,
      },
      habits: [
        {
          habitName: {
            type: String,
            required: true,
          },
          frequency: {
            type: String,  // e.g., daily, weekly, etc.
            required: true,
          },
          isCompleted: {
            type: Boolean,
            default: false,
          },
          dateAdded: {
            type: Date,
            default: Date.now,
          }
        }
      ],
});

const User = mongoose.model('User', userSchema);

export default User;