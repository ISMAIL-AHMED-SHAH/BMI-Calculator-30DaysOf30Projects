"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the BMI result
interface BmiResult {
  bmi: string;
  category: string;
}

export default function BmiCalculator() {
  // State hooks for managing height, weight, BMI result, and error message
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleFeetChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFeet(e.target.value);
  };

  const handleInchesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInches(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  // Function to calculate the BMI and determine the category
  const calculateBmi = (): void => {
    if (!feet || !inches || !weight) {
      setError("Please enter height in feet and inches, and weight.");
      return;
    }

    // Convert height from feet and inches to meters
    const heightInMeters = (parseFloat(feet) * 0.3048) + (parseFloat(inches) * 0.0254);
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);

    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(2), category });
    setError("");
  };

  // JSX return statement rendering the BMI calculator UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-full max-w-md mx-auto bg-gray-800 border border-gray-600 shadow-lg hover:border-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out rounded-lg p-6">
        <CardHeader className="text-center border-b border-gray-700 pb-4 mb-4">
          <CardTitle className="text-4xl font-extrabold text-indigo-400">BMI Calculator</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your height in feet and inches, and your weight in kg.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input for height in feet */}
          <div className="grid gap-2">
            <Label htmlFor="feet" className="text-gray-300">Height (feet)</Label>
            <Input
              id="feet"
              type="number"
              placeholder="Enter feet"
              value={feet}
              onChange={handleFeetChange}
              className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition"
            />
          </div>
          {/* Input for height in inches */}
          <div className="grid gap-2">
            <Label htmlFor="inches" className="text-gray-300">Height (inches)</Label>
            <Input
              id="inches"
              type="number"
              placeholder="Enter inches"
              value={inches}
              onChange={handleInchesChange}
              className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition"
            />
          </div>
          {/* Input for weight */}
          <div className="grid gap-2">
            <Label htmlFor="weight" className="text-gray-300">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 transition"
            />
          </div>
          {/* Button to calculate BMI */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2 rounded-lg shadow-lg hover:shadow-pink-600/50 hover:bg-gradient-to-l transition-all ease-in-out duration-300"
            onClick={calculateBmi}
          >
            Calculate
          </Button>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display BMI result if available */}
          {result && (
            <div className="grid gap-2 text-center">
              <div className="text-3xl font-bold text-indigo-400">{result.bmi}</div>
              <div className="text-gray-300">{result.category}</div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-6 text-center text-gray-400 font-semibold">
        Created by Ismail Ahmed Shah
      </div>
    </div>
  );
}
