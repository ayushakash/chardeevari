const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const MerchantSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: uuid(),
    },
    userId: {
      type: String,
      required: true,
      default: uuid(),
    },
    shopName: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    dealingCategory: {
      type: [String],
      required: true,
    },
    businessCategory: {
      type: String,
    },
    bankAccount: {
      bankName: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
      IFSCCode: {
        type: String,
      },
    },
    onboardingStatus: {
      type: Number,
      required: true,
    },
    gstVerificationStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Merchant = mongoose.model("Merchant", MerchantSchema);

module.exports = Merchant;
