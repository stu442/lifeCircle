import { Category } from "@/types/category";

/**
 * 카테고리의 주간 총 시간을 계산합니다.
 * 일 단위로 입력된 경우 7을 곱하고, 주 단위로 입력된 경우 그대로 반환합니다.
 * @param {Category} category - 시간을 계산할 카테고리
 * @returns {number} 주간 총 시간
 */
export const calculateWeeklyTime = (category: Category): number => {
  return category.isDaily ? category.time * 7 : category.time;
};

/**
 * 모든 카테고리의 주간 총 시간을 계산합니다.
 * @param {Category[]} categories - 시간을 계산할 카테고리 배열
 * @returns {number} 모든 카테고리의 주간 총 시간
 */
export const calculateTotalTime = (categories: Category[]): number => {
  return categories.reduce(
    (sum, category) => sum + calculateWeeklyTime(category),
    0
  );
};

/**
 * 주간 자유 시간을 계산합니다.
 * 168시간(일주일)에서 총 사용 시간을 뺀 값을 반환합니다.
 * 음수가 되는 경우 0을 반환합니다.
 * @param {number} totalTime - 주간 총 사용 시간
 * @returns {number} 남은 자유 시간 (최소 0)
 */
export const calculateFreeTime = (totalTime: number): number => {
  const calculatedFreeTime = 168 - totalTime;
  return calculatedFreeTime > 0 ? calculatedFreeTime : 0;
};
