import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    billingInfo: {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zipcode: { type: String, default: "" },
        country: { type: String, default: "" },
        phone: { type: String, default: "" }
    }
}, { minimize: false })

const userModel = mongoose.models.users || mongoose.model('users', userSchema);

export default userModel;