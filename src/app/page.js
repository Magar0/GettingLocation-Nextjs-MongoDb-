"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // const [location, setLocation] = useState({});
  const [position, setPosition] = useState()
  const [name, SetName] = useState("")
  const [input, setInput] = useState("");

  // const sendDataToBackend = async (newLocation) => {
  //   await fetch('/api', {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ ...newLocation })
  //   })
  // }

  const sendPositionToBackend = async () => {
    await fetch('/api', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(position)
    })
    console.log(position);
  }


  const addName = async () => {
    try {
      await fetch('/api', {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ name })
      })
    } catch (err) {
      console.log(err);
    }
  }

  const getLocation = async () => {
    // no permission
    // try {
    //   const res = await fetch("https://ipapi.co/json");
    //   const data = await res.json();
    //   const { ip, city, region, country_name, latitude, longitude } = data
    //   setLocation({ ip, city, region, country_name, coordinates: [latitude, longitude] });
    //   sendDataToBackend({ ip, city, region, country_name, coordinates: [latitude, longitude] });
    // } catch (err) {
    //   console.log(err);
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, (err) => console.log(err));
    }
  };

  const handleOk = async () => {
    SetName(input)
  }


  useEffect(() => {
    getLocation();
  }, []);
  // useEffect(() => {
  //   if (name) {
  //     addName()
  //   }
  // }, [name])

  useEffect(() => {
    if (position) {
      sendPositionToBackend()
    }
  }, [position])

  console.log(position);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h5 className="text-2xl font-bold mb-5">Please Type Your Name</h5>
      <input
        type="text"
        className="bg-transparent border-b   px-3 pt-4 text-2xl outline-none  "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={e => e.code === "Enter" ? handleOk() : null}
      />
      <button className="bg-slate-800 px-5 py-2 rounded-xl mt-2" onClick={handleOk} >Ok</button>
      {name &&
        <>
          <p className="text-xl mt-10 italic">Hi <span className="font-semibold capitalize ">{name}</span>, you are from {location?.city}, {location?.country_name} </p>
        </>
      }
    </main>
  );
}
