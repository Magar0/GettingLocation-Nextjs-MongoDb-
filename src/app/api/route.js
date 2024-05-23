import Location from "@/models/location";
import connectDb from "@/utils/connectDb";
import { NextResponse } from "next/server";

await connectDb();

export async function POST(req) {
    try {
        const { ip, city, region, country_name, coordinates } = await req.json()
        console.log(ip + city);
        const user = await Location.findOne({ ip })
        if (user) {
            return NextResponse.json({ message: "User exist" }, { status: 400 })
        }
        await Location.create({ ip, city, region, country_name, coordinates })
        return NextResponse.json({ message: "Topic Created Successful" }, { status: 201 })
    } catch (err) {
        console.log(err)
    }
}

export async function PATCH(req) {
    try {
        const { name, ip } = await req.json();
        await Location.findOneAndUpdate({ ip }, { name })
        return NextResponse.json({ message: "Name Updated" }, { status: 200 })
    } catch (err) {
        console.log(err);
    }
}