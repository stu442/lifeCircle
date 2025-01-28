import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { useLocation } from "react-router-dom";
import { CategoryIcon } from "../InputPage/components/CategoryIcon";
import { Category } from "@/types/category";
import { calculateCategoryMonthlyTime, calculateLifetimeMonths, calculateRemainingMonths } from "@/features/result/utils";

const LIFE_EXPECTANCY = 100;

// 임시로 현재 나이 설정 (나중에 입력받을 수 있도록 수정 필요)
const CURRENT_AGE = 30;

export function ResultPage() {
  const { search } = useLocation();
  const categories:Category[] = JSON.parse(decodeURIComponent(search.split('=')[1]));
  const remainingMonths = calculateRemainingMonths(CURRENT_AGE, LIFE_EXPECTANCY);

  // 각 카테고리별 월 수 계산
  const categoryMonths = categories.map(category => ({
    ...category,
    months: calculateLifetimeMonths(
      calculateCategoryMonthlyTime(category),
      LIFE_EXPECTANCY - CURRENT_AGE
    )
  }));

  // 모든 카테고리의 총 월 수
  const totalUsedMonths = categoryMonths.reduce((sum, cat) => sum + cat.months, 0);
  
  return (
    <Layout>
      <Title 
        title="당신의 남은 삶입니다." 
        subTitle={`${LIFE_EXPECTANCY}살까지 산다고 가정했을 때 남은 삶입니다. 원 하나는 30일 입니다.`} 
      />
      
      <div className="flex flex-wrap gap-2 mt-4">
        {/* 카테고리별 아이콘 렌더링 */}
        {categoryMonths.map(category => 
          [...Array(category.months)].map((_, i) => (
            <CategoryIcon
              key={`${category.name}-${i}`}
              icon={category.icon}
              color={category.color}
            />
          ))
        )}
        
        {/* 남은 빈 공간 렌더링 */}
        {[...Array(remainingMonths - totalUsedMonths)].map((_, i) => (
          <CategoryIcon
            key={`empty-${i}`}
            icon=""
            color="#E5E7EB"
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">앞으로 사용할 시간</p>
              <p className="text-2xl font-bold">{totalUsedMonths}개월</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">자유롭게 사용할 수 있는 시간</p>
              <p className="text-2xl font-bold">{remainingMonths - totalUsedMonths}개월</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-4">카테고리별 시간 계획</h3>
          <div className="space-y-3">
            {categoryMonths.map(category => (
              <div 
                key={category.name} 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CategoryIcon 
                  icon={category.icon} 
                  color={category.color}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <span className="font-semibold">{category.months}개월</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    일주일에 {category.isDaily ? category.time * 7 : category.time}시간씩 투자
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
