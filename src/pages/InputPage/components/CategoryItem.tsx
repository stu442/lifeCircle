import { Category } from "@/types/category";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CategoryItemProps {
  category: Category;
  onTimeChange: (newTime: number) => void;
  onToggleDaily: () => void;
}

export function CategoryItem({
  category,
  onTimeChange,
  onToggleDaily,
}: CategoryItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 category-item">
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full"
        style={{ backgroundColor: category.color }}
      >
        {category.icon}
      </div>

      <div className="flex-grow w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <Label className="mb-1 sm:mb-0">{category.name}</Label>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">주</span>
            <Switch
              checked={category.isDaily}
              onCheckedChange={onToggleDaily}
            />
            <span className="text-sm text-gray-500">일</span>
          </div>
        </div>

        <Slider
          min={0}
          max={category.isDaily ? 24 : 168}
          step={1}
          value={[category.time]}
          onValueChange={(value) => onTimeChange(value[0])}
          className="slider-thumb"
        />
      </div>

      <div className="flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto">
        <Input
          type="number"
          min={0}
          max={category.isDaily ? 24 : 168}
          step={1}
          value={category.time}
          onChange={(e) => onTimeChange(parseInt(e.target.value) || 0)}
          className="w-16 text-right"
        />
        <span className="text-sm text-gray-500">
          시간/{category.isDaily ? "일" : "주"}
        </span>
      </div>
    </div>
  );
}
