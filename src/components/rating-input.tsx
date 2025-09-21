"use client";

import { useState, useEffect } from "react";
import { Input } from "./input";

interface RatingInputProps {
  name: string;
  placeholder?: string;
  defaultValue?: number;
  required?: boolean;
  className?: string;
}

export function RatingInput({
  name,
  placeholder = "Betyg",
  defaultValue,
  required = false,
  className = "",
}: RatingInputProps) {
  const [value, setValue] = useState(defaultValue?.toString() || "");
  const [displayValue, setDisplayValue] = useState(
    defaultValue?.toString() || ""
  );

  // Update display value when defaultValue changes (for edit forms)
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue.toString());
      setDisplayValue(defaultValue.toString());
    }
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === "") {
      setValue("");
      setDisplayValue("");
      return;
    }

    // Replace comma with dot for internal processing
    const normalizedValue = inputValue.replace(",", ".");

    // Validate the input: allow numbers with one decimal place
    const decimalRegex = /^\d{1,2}(\.\d)?$/;
    const wholeNumberRegex = /^\d{1,2}$/;

    if (
      decimalRegex.test(normalizedValue) ||
      wholeNumberRegex.test(normalizedValue)
    ) {
      const numValue = parseFloat(normalizedValue);

      // Ensure the value is between 1 and 10 (inclusive)
      if (numValue >= 1 && numValue <= 10) {
        setValue(normalizedValue);
        setDisplayValue(normalizedValue);
      }
    } else if (normalizedValue.length > 0) {
      // If input doesn't match our patterns but has content, check if it's a partial valid input
      const partialDecimalRegex = /^\d{1,2}(\.\d?)?$/;
      if (partialDecimalRegex.test(normalizedValue)) {
        const numValue = parseFloat(normalizedValue);
        // Allow partial input as long as it's not exceeding limits
        if (numValue <= 10) {
          setValue(normalizedValue);
          setDisplayValue(normalizedValue);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
    if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) {
      return;
    }

    // Allow: numbers 0-9
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      return;
    }

    // Allow: dot and comma
    if (e.key === "." || e.key === ",") {
      // Only allow one decimal separator and only if we have at least one digit
      if (!value.includes(".") && !value.includes(",") && value.length > 0) {
        return;
      }
    }

    // Allow: numpad numbers 0-9
    if (e.keyCode >= 96 && e.keyCode <= 105) {
      return;
    }

    // Allow: numpad decimal point
    if (e.keyCode === 110 || e.keyCode === 188) {
      if (!value.includes(".") && !value.includes(",") && value.length > 0) {
        return;
      }
    }

    // Prevent all other keys
    e.preventDefault();
  };

  return (
    <Input
      type="text"
      name={`${name}_decimal`}
      value={displayValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      required={required}
      className={className}
      min={1}
      max={10}
      step="0.1"
    />
  );
}
