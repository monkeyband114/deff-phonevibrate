"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VibrationPage() {
  const [isVibrating, setIsVibrating] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Check if the Vibration API is supported
    if (typeof window !== "undefined" && !("vibrate" in navigator)) {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVibrating) {
      // Set up the vibration interval
      interval = setInterval(() => {
        navigator.vibrate(5000); // Vibrate for 200ms
        setCountdown(10); // Reset countdown
      }, 10000); // Every 30 seconds

      // Set up the countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVibrating]);

  const toggleVibration = () => {
    if (isVibrating) {
      navigator.vibrate(0); // Stop any ongoing vibration
    } else {
      navigator.vibrate(200); // Initial vibration
    }
    setIsVibrating(!isVibrating);
    setCountdown(30); // Reset countdown when toggling
  };

  if (!supported) {
    return (
      <Card className="w-[300px] mx-auto mt-8">
        <CardHeader>
          <CardTitle>Vibration Not Supported</CardTitle>
          <CardDescription>
            Your device does not support the Vibration APIs.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-[300px] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Phone Vibration App</CardTitle>
        <CardDescription>Vibrates every 30 seconds</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Button onClick={toggleVibration}>
          {isVibrating ? "Stop Vibration" : "Start Vibration"}
        </Button>
        {isVibrating && (
          <div className="text-center">
            <p>Next vibration in:</p>
            <p className="text-2xl font-bold">{countdown} seconds</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
