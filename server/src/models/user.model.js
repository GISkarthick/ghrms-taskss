import mongoose from 'mongoose'
// job trigger history table Schema
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String},
    role: { type: String},
    createdBy: { type: String},
    updatedBy: { type: String},
    created: { type: Date, default: Date.now  },
    lastModified: { type: Date, default: Date.now  },
    isVerified: { type: Boolean , default: false },
    isActive: { type: Boolean , default: true },
    isDeleted: { type: Boolean , default: false }
}, { collection: 'users' });

userSchema.index({ email: 1, isDeleted: 1}, { unique: true });
userSchema.index({ mobile: 1, isDeleted: 1}, { unique: true });

export default mongoose.model('userModel', userSchema);

//role - "admin", "dataEntryOpe", "developer", "user"