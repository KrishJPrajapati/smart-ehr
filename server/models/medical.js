import mongoose from "mongoose";

const medicalSchema = mongoose.Schema({
  medicalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Only 10-digit numbers
      },
      message: props => `${props.value} is not a valid 10-digit contact number!`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email regex
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },

  // 🔗 Link to Hospital (Reference)
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // This assumes you have a separate Hospital model
    required: true
  },
  otp: {type: String,default: null},
  otpExpiry: {type: Date,default: null,},

}, { timestamps: true });

const Medical = mongoose.model("Medical", medicalSchema);
export default Medical;
