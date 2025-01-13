import React from "react";

interface TimeCategory {
  name: string;
  hoursPerWeek: number;
  color: string;
}

interface LifeCirclesProps {
  currentAge: number;
  timeCategories: TimeCategory[];
}

const MONTHS_IN_YEAR = 12;
const TOTAL_YEARS = 100;
const GRID_COLUMNS = 50;

export const LifeCircles: React.FC<LifeCirclesProps> = ({
  currentAge,
  timeCategories,
}) => {
  const totalMonths = TOTAL_YEARS * MONTHS_IN_YEAR;
  const monthsLived = currentAge * MONTHS_IN_YEAR;
  const monthsRemaining = totalMonths - monthsLived;

  const generateCircles = () => {
    const circles = [];
    let monthCount = 0;

    // Future months
    const totalHours = timeCategories.reduce(
      (sum, category) => sum + category.hoursPerWeek,
      0
    );
    const categoryMonths = timeCategories.map((category) =>
      Math.round((category.hoursPerWeek / totalHours) * monthsRemaining)
    );

    timeCategories.forEach((category, index) => {
      for (let i = 0; i < categoryMonths[index]; i++) {
        if (monthCount < monthsRemaining) {
          circles.push(
            <div
              key={`${category.name}-${i}`}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: category.color }}
            />
          );
          monthCount++;
        }
      }
    });

    // Past months
    for (let i = 0; i < monthsLived; i++) {
      circles.push(
        <div
          key={`past-${i}`}
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: "#E5E7EB" }}
        />
      );
      monthCount++;
    }

    return circles;
  };

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      {generateCircles()}
    </div>
  );
};
