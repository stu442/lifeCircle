import { calculateRemainingWeeks, calculateCategoryWeeklyTime, calculateLifetimeWeeks } from './utils';
import { Category } from '@/types/category';

describe('calculateRemainingWeeks', () => {
  test('현재 나이가 30세이고 기대수명이 80세일 때 남은 주 수를 정확히 계산한다', () => {
    // given
    const currentAge = 30;
    const lifeExpectancy = 80;

    // when
    const result = calculateRemainingWeeks(currentAge, lifeExpectancy);

    // then
    expect(result).toBe(2600); // (80-30) * 52
  });

  test('현재 나이와 기대수명이 같을 때 0을 반환한다', () => {
    // given
    const currentAge = 80;
    const lifeExpectancy = 80;

    // when
    const result = calculateRemainingWeeks(currentAge, lifeExpectancy);

    // then
    expect(result).toBe(0);
  });
});

describe('calculateCategoryWeeklyTime', () => {
  test('일간 활동의 경우 주간 시간으로 정확히 변환한다', () => {
    // given
    const dailyCategory: Category = {
      name: '운동',
      time: 1,
      isDaily: true,
      icon: 'test',
      color: 'test',
    };

    // when
    const result = calculateCategoryWeeklyTime(dailyCategory);

    // then
    expect(result).toBe(7); // 1시간 * 7일
  });

  test('주간 활동의 경우 입력된 시간을 그대로 반환한다', () => {
    // given
    const weeklyCategory: Category = {
      name: '주말 등산',
      time: 4,
      isDaily: false,
      icon: 'test',
      color: 'test',
    };

    // when
    const result = calculateCategoryWeeklyTime(weeklyCategory);

    // then
    expect(result).toBe(4);
  });
});

describe('calculateLifetimeWeeks', () => {
  test('남은 년수와 주간 시간으로 정확한 주 수를 계산한다', () => {
    // given
    const remainingYears = 50;
    const weeklyTime = 10;

    // when
    const result = calculateLifetimeWeeks(weeklyTime, remainingYears);

    // then
    // 계산: (10시간 * 50년 * 52주) / 168시간 = 154.7619047619 ≈ 155주
    expect(result).toBe(155);
  });

  test('남은 년수가 0일 때 0을 반환한다', () => {
    // given
    const remainingYears = 0;
    const weeklyTime = 10;
    
    // when
    const result = calculateLifetimeWeeks(weeklyTime, remainingYears);

    // then
    expect(result).toBe(0);
  });

  test('주간 시간이 0일 때 0을 반환한다', () => {
    // given
    const remainingYears = 50;
    const weeklyTime = 0;
    
    // when
    const result = calculateLifetimeWeeks(weeklyTime, remainingYears);

    // then
    expect(result).toBe(0);
  });
});
