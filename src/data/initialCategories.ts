import { Category } from "@/types/category";

export const initialCategories: Category[] = [
  { name: "수면", icon: "🛌", color: "#4299E1", time: 8, isDaily: true },
  { name: "직장", icon: "💼", color: "#48BB78", time: 45, isDaily: false },
  { name: "여가", icon: "🎨", color: "#ED8936", time: 0, isDaily: false },
  { name: "운동", icon: "🏋️", color: "#3490DC", time: 1, isDaily: true },
  {
    name: "스크린 타임",
    icon: "📱",
    color: "#9F7AEA",
    time: 4,
    isDaily: true,
  },
  { name: "기타", icon: "📌", color: "#A0AEC0", time: 0, isDaily: false },
];
