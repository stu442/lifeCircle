import { Category } from "@/types/category";

/**
   * 특정 카테고리의 시간을 변경합니다.
   * @param {Category[]} categories - 카테고리 배열
   * @param {number} index - 변경할 카테고리의 인덱스
   * @param {number} newTime - 새로운 시간 값
 * @returns {Category[]} 업데이트된 카테고리 배열
 */
export const setCategoriesTime = (categories: Category[], index: number, newTime: number) => {
  console.assert(newTime >= 0, '시간은 0 이상이어야 합니다.');
  console.assert(newTime <= 168, '시간은 168 이하이어야 합니다.');
  const updatedCategories = [...categories];
  updatedCategories[index].time = newTime;
  return updatedCategories;
};

/**
   * 특정 카테고리의 시간 단위(일/주)를 토글합니다.
   * 단위가 변경될 때 시간 값도 자동으로 변환됩니다.
   * @param {Category[]} categories - 카테고리 배열
   * @param {number} index - 변경할 카테고리의 인덱스
   * @returns {Category[]} 업데이트된 카테고리 배열
   */
export const toggleCategoryDaily = (categories: Category[], index: number) => {
  const updatedCategories = [...categories];
  const selectedCategory = updatedCategories[index];
  selectedCategory.isDaily = !selectedCategory.isDaily;
  if (selectedCategory.isDaily) {
      selectedCategory.time = Math.round(selectedCategory.time / 7);
    } else {
      selectedCategory.time = selectedCategory.time * 7;
    }
    return updatedCategories;
  };