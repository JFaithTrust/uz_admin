import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioInput = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1>Choose Gender:</h1>
        <RadioGroup defaultValue="male" className="flex my-3">
          <div className="flex items-center space-x-2 border-2 rounded-xl border-gray-300 px-5 py-3">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2 border-2 rounded-xl border-gray-300 px-5 py-3">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};

export default RadioInput;
