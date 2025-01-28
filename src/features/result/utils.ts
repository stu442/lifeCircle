import { Category } from "@/types/category";

/**
 * 현재 나이와 기대 수명을 기반으로 남은 개월 수를 계산합니다.
 * @param {number} currentAge - 현재 나이
 * @param {number} lifeExpectancy - 기대 수명
 * @returns {number} 남은 개월 수
 */
export const calculateRemainingMonths = (currentAge: number, lifeExpectancy: number): number => {
    const remainingYears = lifeExpectancy - currentAge;
    const monthsPerYear = 12;
    return remainingYears * monthsPerYear;
};

/**
 * 카테고리의 시간 투자량을 월간 단위로 계산합니다.
 * 일일 활동의 경우 월간 시간으로 변환하고, 주간 단위인 경우 월간 시간으로 변환합니다.
 * @param {Category} category - 시간을 계산할 카테고리
 * @returns {number} 월간 총 시간
 */
export const calculateCategoryMonthlyTime = (category: Category): number => {
    if (category.isDaily) {
      // 일간 시간을 월간 시간으로 변환 (하루 시간 * 평균 30.44일)
      return category.time * 30.44;
    }
    // 주간 시간을 월간 시간으로 변환 (주간 시간 * 평균 4.348주)
    return category.time * 4.348;
};

/**
 * 특정 활동에 대해 남은 생애 동안의 개월 수를 계산합니다.
 * 총 투자 시간을 월당 최대 가능 시간(730.5시간)으로 나누어 필요한 개월 수를 계산
 * @param {number} monthlyTime - 월당 투자 시간
 * @param {number} remainingYears - 남은 수명(년)
 * @returns {number} 남은 생애 동안의 개월 수 (반올림)
 */
export const calculateLifetimeMonths = (monthlyTime: number, remainingYears: number): number => {
  if (monthlyTime === 0 || remainingYears === 0) {
    return 0;
  }
  const monthsPerYear = 12;
  const hoursPerMonth = 730.5; // 월당 최대 가능 시간 (24시간 * 30.44일)
  const totalTime = monthlyTime * remainingYears * monthsPerYear;
  return Math.round(totalTime / hoursPerMonth);
};

/**
 * 월 수를 년 수로 변환합니다.
 * @param {number} month - 월 수
 * @returns {number} 년 수
 */
export const monthToYear = (month: number): number => {
  if (month < 0) {
    throw new Error('월 수는 0 이상이어야 합니다.');
  }
  return Math.round(month / 12);
};