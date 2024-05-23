import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        ip: String,
        city: String,
        region: String,
        country_name: String,
        coordinates: [],
    },
    {
        timestamps: true,
    }
)

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;