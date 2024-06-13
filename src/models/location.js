import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    // {
    //     name: {
    //         type: String,
    //         default: "",
    //     },
    //     ip: String,
    //     city: String,
    //     region: String,
    //     country_name: String,
    //     coordinates: [],
    // },
    {
        name: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        userIP: {
            type: String,
            require: true,
        },
        position: String,
    },
    {
        timestamps: true,
    }
)

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;