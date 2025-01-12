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

// 조금 더 모바일 친화적으로 UI 만들기 (화면 작아질 시 대처)
export function CategoryItem({
  category,
  onTimeChange,
  onToggleDaily,
}: CategoryItemProps) {
  return (
    <div className="flex items-center space-x-4 category-item">
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full"
        style={{ backgroundColor: category.color }}
      >
        {category.icon}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <Label>{category.name}</Label>

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
  );
}
