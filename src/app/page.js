// src/app/page.js
"use client";

import getTwitchToken from "../../pages/api/twitchAuth";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [token, setToken] = useState(""); // State variable for storing the token

  async function fetchTwitchToken() {
    try {
      const clientId = process.env.NEXT_PUBLIC_TWITCH_ID;
      const clientSecret = process.env.NEXT_PUBLIC_TWITCH_SECRET;

      const tokenResponse = await getTwitchToken(clientId, clientSecret);
      const accessToken = tokenResponse.data; // Renamed the variable

      console.log(tokenResponse);

      setToken(accessToken); // Update the state variable
    } catch (error) {
      console.error("error message", error);
    }
  }

  useEffect(() => {
    fetchTwitchToken();
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">Div</main>
    </>
  );
}
