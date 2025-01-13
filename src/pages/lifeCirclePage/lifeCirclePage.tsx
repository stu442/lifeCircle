import { Card, CardContent } from "@/components/ui/card";
import { LifeCircles } from "./components/LifeCircles";

const timeCategories = [
  { name: "수면", hoursPerWeek: 56, color: "#3B82F6" },
  { name: "일", hoursPerWeek: 40, color: "#10B981" },
  { name: "여가", hoursPerWeek: 30, color: "#F59E0B" },
  { name: "운동", hoursPerWeek: 7, color: "#EF4444" },
  { name: "기타", hoursPerWeek: 35, color: "#8B5CF6" },
];

export default function LifeCalendarPage() {
  const currentAge = 24; // 예시 나이, 실제로는 사용자 입력값을 사용해야 합니다.

  const totalMonths = 100 * 12;
  const monthsLived = currentAge * 12;
  const monthsRemaining = totalMonths - monthsLived;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            당신의 삶은 몇 달 남았나요?
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            각 원은 당신의 한 달을 나타냅니다. 지금부터 남은 시간을
            설계해보세요.
          </p>

          <div className="flex justify-center mb-8 overflow-auto">
            <LifeCircles
              currentAge={currentAge}
              timeCategories={timeCategories}
            />
          </div>

          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-gray-800">
              {monthsRemaining} 개월
            </p>
            <p className="text-gray-600">남은 시간</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {timeCategories.map((category) => (
              <div key={category.name} className="flex items-center">
                <div
                  className="w-6 h-6 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-gray-700">{category.name}</span>
              </div>
            ))}
            <div className="flex items-center">
              <div
                className="w-6 h-6 rounded-full mr-2"
                style={{ backgroundColor: "#E5E7EB" }}
              ></div>
              <span className="text-gray-700">지난 시간</span>
            </div>
          </div>

          <div className="mt-8 text-center italic text-gray-600">
            "시간은 우리를 기다려주지 않습니다. 당신의 남은 시간을 설계하세요."
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
