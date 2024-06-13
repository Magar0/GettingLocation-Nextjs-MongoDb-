import Location from "@/models/location";
import connectDb from "@/utils/connectDb";
import { NextResponse } from "next/server";
import { os } from 'os'

await connectDb();

// export async function POST(req) {
//     try {
//         const { ip, city, region, country_name, coordinates } = await req.json()
//         console.log(ip + city);
//         const user = await Location.findOne({ ip })
//         if (user) {
//             return NextResponse.json({ message: "User exist" }, { status: 400 })
//         }
//         await Location.create({ ip, city, region, country_name, coordinates })
//         return NextResponse.json({ message: " Created Successful" }, { status: 201 })
//     } catch (err) {
//         console.log(err)
//     }
// }

export async function POST(req) {
    try {
        const userIP = req.headers['x-vercel-ip']
        const newLocation = await req.json()
        // const user = await Location.findOne({ userIP })
        // if (user) {
        //     return NextResponse.json({ message: "User exist" }, { status: 400 })
        // }
        await Location.create({ userIP, position: [newLocation.latitude, newLocation.longitude] })
        return NextResponse.json({ message: " Created Successful" }, { status: 201 })
    } catch (error) {
        console.log(error);
    }
}

export async function PATCH(req) {
    try {
        const userIP = await req.ip
        const { name } = await req.json();
        await Location.findOneAndUpdate({ userIP }, { name })
        return NextResponse.json({ message: "Name Updated" }, { status: 200 })
    } catch (err) {
        console.log(err);
    }
}