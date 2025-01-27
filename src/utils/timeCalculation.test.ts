import { calculateWeeklyTime, calculateTotalTime, calculateFreeTime } from "./timeCalculations";
import { Category } from "@/types/category";

describe("calculateWeeklyTime", () => {
  let dailyCategory: Category;
  let weeklyCategory: Category;

  beforeEach(() => {
    dailyCategory = {
      isDaily: true,
      time: 2,
      name: "테스트",
      icon: "test",
      color: "test",
    };

    weeklyCategory = {
      isDaily: false,
      time: 10,
      name: "테스트",
      icon: "test",
      color: "test",
    };
  });

  // given: 일일 단위로 설정된 카테고리가 주어졌을 때
  // when: 주간 시간을 계산하면
  // then: 일일 시간 * 7의 결과를 반환해야 한다
  it("일일 단위 카테고리의 주간 시간을 계산한다", () => {
    expect(calculateWeeklyTime(dailyCategory)).toBe(14);
  });

  // given: 주간 단위로 설정된 카테고리가 주어졌을 때
  // when: 주간 시간을 계산하면
  // then: 입력된 시간을 그대로 반환해야 한다
  it("주간 단위 카테고리의 시간을 그대로 반환한다", () => {
    expect(calculateWeeklyTime(weeklyCategory)).toBe(10);
  });
});

describe("calculateTotalTime", () => {
  let categories: Category[];

  beforeEach(() => {
    categories = [
      { isDaily: true, time: 2, name: "일일 카테고리", icon: "test", color: "test" },
      { isDaily: false, time: 10, name: "주간 카테고리", icon: "test", color: "test" },
    ];
  });

  // given: 여러 카테고리가 주어졌을 때
  // when: 총 시간을 계산하면
  // then: 모든 카테고리의 주간 시간 합계를 반환해야 한다
  it("모든 카테고리의 주간 총 시간을 계산한다", () => {
    expect(calculateTotalTime(categories)).toBe(24);
  });

  // given: 빈 카테고리 배열이 주어졌을 때
  // when: 총 시간을 계산하면
  // then: 0을 반환해야 한다
  it("카테고리가 없는 경우 0을 반환한다", () => {
    expect(calculateTotalTime([])).toBe(0);
  });
});

describe("calculateFreeTime", () => {
  // given: 주간 총 사용 시간이 주어졌을 때
  // when: 자유 시간을 계산하면
  // then: 168시간에서 사용 시간을 뺀 값을 반환해야 한다
  it("주간 자유 시간을 계산한다", () => {
    expect(calculateFreeTime(100)).toBe(68);
  });

  // given: 주간 총 사용 시간이 168시간을 초과할 때
  // when: 자유 시간을 계산하면
  // then: 0을 반환해야 한다
  it("사용 시간이 168시간을 초과하면 0을 반환한다", () => {
    expect(calculateFreeTime(170)).toBe(0);
  });

  // given: 주간 총 사용 시간이 168시간일 때
  // when: 자유 시간을 계산하면
  // then: 0을 반환해야 한다
  it("사용 시간이 168시간이면 0을 반환한다", () => {
    expect(calculateFreeTime(168)).toBe(0);
  });
});
