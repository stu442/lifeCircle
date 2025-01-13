import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AgeInputPage() {
  const [age, setAge] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const ageNum = parseInt(age);
    if (age === "") {
      setIsValid(false);
      setError("");
      setRemainingTime("");
    } else if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 120) {
      setIsValid(false);
      setError("현실적인 나이를 입력해주세요!");
      setRemainingTime("");
    } else {
      setIsValid(true);
      setError("");
      const remainingYears = 80 - ageNum;
      setRemainingTime(
        `만약 평균 수명이 80세라면, 당신에게는 약 ${remainingYears}년이 남았습니다.`
      );
    }
  }, [age]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const quoteElement = document.getElementById("quote");
      if (quoteElement) {
        quoteElement.classList.remove("opacity-0");
        quoteElement.classList.add("opacity-100");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Here you would typically navigate to the next page or handle the submission
      console.log("Submitted age:", age);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 transition-all duration-500 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          당신의 나이를 입력하세요
        </h1>
        <p className="text-center text-gray-600 mb-6">
          남은 삶의 시간을 시각화해 보세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="number"
              placeholder="나이를 입력하세요"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full text-center text-2xl"
              min="1"
              max="120"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div
            className={`text-center text-gray-600 transition-all duration-500 ease-in-out ${
              remainingTime
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            {remainingTime}
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
            disabled={!isValid}
          >
            시간 입력하기
          </Button>
        </form>
      </div>

      <p
        id="quote"
        className="mt-8 text-gray-600 italic opacity-0 transition-opacity duration-500 ease-in-out delay-500"
      >
        "시간은 우리를 기다려주지 않습니다."
      </p>
    </div>
  );
}
