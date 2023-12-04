"use client";
import { INTERACTION } from "@/app/utils/interaction";
import React, { useState, useEffect } from "react";
import { idle, drinkingCoffee } from "./tamagotchiFrames";

import "../index.css";

const DEFAULT_STATUS = ":)";
const Tamagotchi: React.FC = () => {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [animation, setAnimation] = useState(idle);
  const [tamaStatus, setTamaStatus] = useState(DEFAULT_STATUS);

  //TODO - call init endpoint to determine if tamagotchi is initialized. if not generate one.

  useEffect(() => {
    // Cycle through frames every 1 second
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % idle.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResponse = (responseText: string) => {
    const responseJSON = JSON.parse(responseText);
    const animation = JSON.parse(responseJSON.animation);
    const status = responseJSON.status;
    setFrameIndex(0);
    setAnimation(animation);
    setTamaStatus(status);
  };

  const feedTamagotchi = async (e: any) => {
    // Add logic to feed the Tamagotchi here
    setTamaStatus("Feeding...");
    try {
      const response = await fetch("/api/interact", {
        method: "POST",
        body: JSON.stringify({
          interactionType: INTERACTION.FEED,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseText = await response.text();
      handleResponse(responseText);
    } catch (e) {
      console.log(e);
    }

    console.log("Tamagotchi fed!");

    // TODO - there may be a race condition here if user clicks the button too fast?
    setTimeout(() => {
      setAnimation(idle);
      setTamaStatus(DEFAULT_STATUS);
    }, 9000);
  };

  const playWithTamagotchi = async (e: any) => {
    // Add logic to feed the Tamagotchi here
    setTamaStatus("Playing...");
    try {
      const response = await fetch("/api/interact", {
        method: "POST",
        body: JSON.stringify({
          interactionType: INTERACTION.PLAY,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseText = await response.text();
      handleResponse(responseText);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setAnimation(idle);
      setTamaStatus(DEFAULT_STATUS);
    }, 9000);
  };

  const treatSickTamagotchi = async (e: any) => {
    try {
      const response = await fetch("/api/interact", {
        method: "POST",
        body: JSON.stringify({
          interactionType: INTERACTION.GO_TO_HOSPITAL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseText = await response.text();
      handleResponse(responseText);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setAnimation(idle);
      setTamaStatus(DEFAULT_STATUS);
    }, 9000);
  };

  const checkStatus = () => {
    // Add logic to check the Tamagotchi's status here
    console.log("Tamagotchi status checked!");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-slate-50 tamago-frame">
      <div className="text-center mb-2">Status: {tamaStatus}</div>
      <div className="min-w-[300px] p-4 border border-black rounded-lg  h-[250px] overflow-auto tamago-screen">
        <div className="flex justify-between mb-4">
          <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            🍴
          </button>
          {/* TODO - all other actions */}
          {/* <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
          >
            💡
          </button> */}
          <button
            onClick={playWithTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            🎯
          </button>
          <button
            onClick={treatSickTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            💉
          </button>
        </div>
        <pre className="text-center">{animation[frameIndex]}</pre>
        <div className="flex justify-between">
          <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            🛀
          </button>
          <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            📋
          </button>
          <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
            style={{ width: "80px" }}
          >
            😡
          </button>
          {/* <button
            onClick={feedTamagotchi}
            className="px-4 py-2 mr-2 bg-blue-200 rounded-lg"
          >
            👥
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Tamagotchi;
