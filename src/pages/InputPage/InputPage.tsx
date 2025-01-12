import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CategoryItem } from "@/pages/InputPage/components/CategoryItem";
import { AddCategoryDialog } from "@/pages/InputPage/components/AddCategoryDialog";
import { Category } from "@/types/category";
import { initialCategories } from "@/data/initialCategories";
import {
  calculateTotalTime,
  calculateFreeTime,
} from "@/utils/timeCalculations";

/**
 * 주간 시간 입력 페이지 컴포넌트입니다.
 * 사용자가 각 카테고리별 시간을 입력하고 관리할 수 있습니다.
 */
export default function InputPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    icon: "",
    color: "#000000",
    time: 0,
    isDaily: false,
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [freeTime, setFreeTime] = useState(30);

  const totalTime = calculateTotalTime(categories);

  useEffect(() => {
    setFreeTime(calculateFreeTime(totalTime));
  }, [totalTime]);

  /**
   * 특정 카테고리의 시간을 변경합니다.
   * @param {number} index - 변경할 카테고리의 인덱스
   * @param {number} newTime - 새로운 시간 값
   */
  const handleTimeChange = (index: number, newTime: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].time = newTime;
    setCategories(updatedCategories);
  };

  /**
   * 특정 카테고리의 시간 단위(일/주)를 토글합니다.
   * 단위가 변경될 때 시간 값도 자동으로 변환됩니다.
   * @param {number} index - 변경할 카테고리의 인덱스
   */
  const handleToggleDaily = (index: number) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[index];
    category.isDaily = !category.isDaily;
    if (category.isDaily) {
      category.time = Math.round(category.time / 7);
    } else {
      category.time = category.time * 7;
    }
    setCategories(updatedCategories);
  };

  /**
   * 새로운 카테고리를 추가합니다.
   * 이름과 아이콘이 입력된 경우에만 추가됩니다.
   */
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.icon) {
      setCategories([...categories, { ...newCategory, time: 0 }]);
      setNewCategory({
        name: "",
        icon: "",
        color: "#000000",
        time: 0,
        isDaily: false,
      });
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">이번 주를 어떻게 보내셨나요?</h1>
      <p className="text-gray-600 mb-8">
        이번 주를 어떻게 보내셨는지 알려주세요. 남은 시간을 알려드릴게요.
      </p>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            category={category}
            onTimeChange={(newTime) => handleTimeChange(index, newTime)}
            onToggleDaily={() => handleToggleDaily(index)}
          />
        ))}

        <div className="flex items-center space-x-4 category-item">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
            🕒
          </div>
          <div className="flex-grow">
            <Label>자유 시간</Label>
            <div className="h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400"
                style={{ width: `${(freeTime / 168) * 100}%` }}
              ></div>
            </div>
          </div>
          <Input
            type="number"
            value={freeTime}
            readOnly
            className="w-16 text-right bg-gray-100"
          />
          <span className="text-sm text-gray-500">시간/주</span>
        </div>
      </div>

      <AddCategoryDialog
        open={isAddingCategory}
        onOpenChange={setIsAddingCategory}
        newCategory={newCategory}
        onNewCategoryChange={setNewCategory}
        onAddCategory={handleAddCategory}
      />

      <div className="mt-8 text-right">
        <p
          className={`text-lg font-semibold ${
            totalTime > 168 ? "text-red-500" : "text-green-500"
          }`}
        >
          현재 입력한 총합: {totalTime} / 168시간
        </p>
        {totalTime > 168 && (
          <p className="text-red-500 text-sm">168시간을 초과할 수 없습니다.</p>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button disabled={totalTime > 168}>
          다음 <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
