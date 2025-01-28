import { calculateCategoryMonthlyTime, calculateLifetimeMonths, calculateRemainingMonths, monthToYear } from './utils';
import { Category } from '@/types/category';

describe('calculateRemainingMonths', () => {
  test('현재 나이가 30세이고 기대수명이 80세일 때 남은 개월 수를 정확히 계산한다', () => {
    // given
    const currentAge = 30;
    const lifeExpectancy = 80;

    // when
    const result = calculateRemainingMonths(currentAge, lifeExpectancy);

    // then
    expect(result).toBe(600); // (80-30) * 12
  });

  test('현재 나이와 기대수명이 같을 때 0을 반환한다', () => {
    // given
    const currentAge = 80;
    const lifeExpectancy = 80;

    // when
    const result = calculateRemainingMonths(currentAge, lifeExpectancy);

    // then
    expect(result).toBe(0);
  });
});

describe('calculateCategoryMonthlyTime', () => {
  test('일간 활동의 경우 월간 시간으로 정확히 변환한다', () => {
    // given
    // 매일 1시간의 운동을 한다는 것
    // 월간 시간은 평균 30.44일로 계산
    const dailyCategory: Category = {
      name: '운동',
      time: 1,
      isDaily: true,
      icon: 'test',
      color: 'test',
    };

    // when
    const result = calculateCategoryMonthlyTime(dailyCategory);

    // then
    expect(result).toBe(30.44); // 1시간 * 
  });

  test('주간 활동의 경우에는 ', () => {
    // given
    // 주에 4시간을 한다는 의미
    // 주간시간 * 평균 4.348주

    const weeklyCategory: Category = {
      name: '주말 등산',
      time: 4,
      isDaily: false,
      icon: 'test',
      color: 'test',
    };

    // when
    const result = calculateCategoryMonthlyTime(weeklyCategory);

    // then
    expect(result).toBe(17.392); // 4 * 4.348
  });
});

describe('calculateLifetimeMonths', () => {
  test('남은 년수와 월간 시간으로 정확한 월 수를 계산한다', () => {
    // given
    // 남은 생존 년수
    const remainingYears = 50;
    // 달에 10시간을 한다는 의미
    const monthlyTime = 10;

    // when
    const result = calculateLifetimeMonths(monthlyTime, remainingYears);

    // then
    // 계산: (10시간 * 50년 * 12달) / 730.5시간 = 8.2135523614
    expect(result).toBe(8);
  });

  test('남은 년수가 0일 때 0을 반환한다', () => {
    // given
    const remainingYears = 0;
    const monthlyTime = 10;
    
    // when
    const result = calculateLifetimeMonths(monthlyTime, remainingYears);

    // then
    expect(result).toBe(0);
  });

  test('월간 시간이 0일 때 0을 반환한다', () => {
    // given
    const remainingYears = 50;
    const monthlyTime = 0;
    
    // when
    const result = calculateLifetimeMonths(monthlyTime, remainingYears);

    // then
    expect(result).toBe(0);
  });

  describe('monthToYear', () => {
    test('월 수를 년 수로 변환한다', () => {
      // given
      const month = 12;

      // when
      const result = monthToYear(month);

      // then
      expect(result).toBe(1);
    });

    test('월 수가 0일 때 0을 반환한다', () => {
      // given
      const month = 0;

      // when
      const result = monthToYear(month);

      // then
      expect(result).toBe(0);
    });
  });

  test('월 수가 음수일 때 예외를 발생시킨다', () => {
    // given
    const month = -1;

    // when
    expect(() => monthToYear(month)).toThrow('월 수는 0 이상이어야 합니다.');
  });
});
