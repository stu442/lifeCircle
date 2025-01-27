import { setCategoriesTime, toggleCategoryDaily } from './utils';
import { Category } from '@/types/category';

describe('카테고리 유틸리티 테스트', () => {
  describe('setCategoriesTime 함수 테스트', () => {
    let initialCategories: Category[];
    let targetIndex: number;

    beforeEach(() => {
      initialCategories = [
        { name: '운동', time: 1, isDaily: true, icon: 'test', color: 'test' },
        { name: '독서', time: 2, isDaily: false, icon: 'test', color: 'test' }
      ];
      targetIndex = 0;
    });

    test('특정 카테고리의 시간을 업데이트해야 한다', () => {
      const newTime = 3;
      const result = setCategoriesTime(initialCategories, targetIndex, newTime);

      expect(result[targetIndex].time).toBe(newTime);
      expect(result[1].time).toBe(2);
      expect(result).not.toBe(initialCategories);
    });
  });

  describe('toggleCategoryDaily 함수 테스트', () => {
    let initialCategories: Category[];
    let targetIndex: number;

    beforeEach(() => {
      targetIndex = 0;
    });

    test('일일에서 주간으로 상태를 변경하고 시간을 조정해야 한다', () => {
      initialCategories = [
        { name: '운동', time: 1, isDaily: true, icon: 'test', color: 'test' },
        { name: '독서', time: 2, isDaily: false, icon: 'test', color: 'test' }
      ];
      const result = toggleCategoryDaily(initialCategories, targetIndex);

      expect(result[targetIndex].isDaily).toBe(false);
      expect(result[targetIndex].time).toBe(7);
      expect(result[1]).toEqual(initialCategories[1]);
    });

    test('주간에서 일일로 상태를 변경하고 시간을 조정해야 한다', () => {
      initialCategories = [
        { name: '운동', time: 7, isDaily: false, icon: 'test', color: 'test' },
        { name: '독서', time: 2, isDaily: false, icon: 'test', color: 'test' }
      ];
      const result = toggleCategoryDaily(initialCategories, targetIndex);

      expect(result[targetIndex].isDaily).toBe(true);
      expect(result[targetIndex].time).toBe(1);
      expect(result[1]).toEqual(initialCategories[1]);
    });
  });
});
