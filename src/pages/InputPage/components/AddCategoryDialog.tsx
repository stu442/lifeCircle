import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Category } from "@/types/category";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCategory: Category;
  onNewCategoryChange: (category: Category) => void;
  onAddCategory: () => void;
}

/**
 * 새로운 카테고리를 추가하기 위한 다이얼로그 컴포넌트입니다.
 * 카테고리의 이름, 아이콘, 색상, 시간 단위를 입력받습니다.
 */
export function AddCategoryDialog({
  open,
  onOpenChange,
  newCategory,
  onNewCategoryChange,
  onAddCategory,
}: AddCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 add-category-button">
          <Plus className="mr-2 h-4 w-4" /> 새 카테고리 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 카테고리 추가</DialogTitle>
          <DialogDescription>
            새로운 카테고리의 이름, 아이콘, 색상을 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              이름
            </Label>
            <Input
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                onNewCategoryChange({ ...newCategory, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              아이콘
            </Label>
            <Input
              id="icon"
              value={newCategory.icon}
              onChange={(e) =>
                onNewCategoryChange({ ...newCategory, icon: e.target.value })
              }
              className="col-span-3"
              placeholder="이모지 입력"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              색상
            </Label>
            <Input
              id="color"
              type="color"
              value={newCategory.color}
              onChange={(e) =>
                onNewCategoryChange({ ...newCategory, color: e.target.value })
              }
              className="col-span-3 h-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="daily"
              checked={newCategory.isDaily}
              onCheckedChange={(checked) =>
                onNewCategoryChange({ ...newCategory, isDaily: checked })
              }
            />
            <Label htmlFor="daily">일 단위로 입력</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAddCategory}>
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
