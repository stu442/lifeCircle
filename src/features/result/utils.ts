import { Category } from "@/types/category";

/**
 * 현재 나이와 기대 수명을 기반으로 남은 주 수를 계산합니다.
 * @param {number} currentAge - 현재 나이
 * @param {number} lifeExpectancy - 기대 수명
 * @returns {number} 남은 주 수
 */
export const calculateRemainingWeeks = (currentAge: number, lifeExpectancy: number): number => {
    const remainingYears = lifeExpectancy - currentAge;
    const weeksPerYear = 52;
    return remainingYears * weeksPerYear;
  };

/**
 * 카테고리의 시간 투자량을 주간 단위로 계산합니다.
 * 일일 활동의 경우 주간 시간으로 변환하고, 이미 주간 단위인 경우 그대로 반환합니다.
 * @param {Category} category - 시간을 계산할 카테고리
 * @returns {number} 주간 총 시간
 */
export const calculateCategoryWeeklyTime = (category: Category): number => {
    if (category.isDaily) {
      // 일간 시간을 주간 시간으로 변환 (하루 시간 * 7일)
      return category.time * 7;
    }
    // 이미 주간 시간인 경우 그대로 반환
    return category.time;
  };

/**
 * 특정 활동에 대해 남은 생애 동안의 주 수를 계산합니다.
 * 총 투자 시간을 주당 최대 가능 시간(168시간)으로 나누어 필요한 주 수를 계산
 * @param {number} weeklyTime - 주당 투자 시간
 * @param {number} remainingYears - 남은 수명(년)
 * @returns {number} 남은 생애 동안의 주 수 (반올림)
 */
export const calculateLifetimeWeeks = (weeklyTime: number, remainingYears: number): number => {
  if (weeklyTime === 0 || remainingYears === 0) {
    return 0;
  }
  const weeksPerYear = 52;
  const hoursPerWeek = 168; // 주당 최대 가능 시간 (24시간 * 7일)
  const totalTime = weeklyTime * remainingYears * weeksPerYear;
  return Math.round(totalTime / hoursPerWeek);
};
