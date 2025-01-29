import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { useLocation } from "react-router-dom";
import { CategoryIcon } from "../InputPage/components/CategoryIcon";
import { Category } from "@/types/category";
import { calculateCategoryMonthlyTime, calculateLifetimeMonths, calculateRemainingMonths, monthToYear } from "@/features/result/utils";

const LIFE_EXPECTANCY = 80;

export function ResultPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const categories: Category[] = JSON.parse(decodeURIComponent(searchParams.get('categories') || '[]'));
  const age = parseInt(searchParams.get('age') || '30');
  const remainingMonths = calculateRemainingMonths(age, LIFE_EXPECTANCY);

  // 각 카테고리별 월 수 계산
  const categoryMonths = categories.map(category => ({
    ...category,
    months: calculateLifetimeMonths(
      calculateCategoryMonthlyTime(category),
      LIFE_EXPECTANCY - age
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
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">시간 투자에 대한 메시지</h3>
        <p className="text-gray-600 leading-relaxed">
              아직 {monthToYear(remainingMonths - totalUsedMonths)}년이라는 시간이 남아있습니다.
              이 소중한 시간을 어떻게 채워나가고 싶으신가요? 
              지금 생각하신 시간 투자로 더 풍요로운 삶을 만들어가시길 바랍니다.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">앞으로 사용할 시간</p>
              <div>
                <p className="text-2xl font-bold">{totalUsedMonths}개월</p>
                <p className="text-sm text-gray-500">약 {monthToYear(totalUsedMonths)}년</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">자유롭게 사용할 수 있는 시간</p>
              <div>
                <p className="text-2xl font-bold">{remainingMonths - totalUsedMonths}개월</p>
                <p className="text-sm text-gray-500">약 {monthToYear(remainingMonths - totalUsedMonths)}년</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-4">유형별 시간 소비량</h3>
          <div className="space-y-3">
            {categoryMonths.map(category => (
              <div 
                key={category.name} 
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
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
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                    <span>일주일에 {category.isDaily ? category.time * 7 : category.time}시간씩 투자</span>
                    <span>약 {monthToYear(category.months)}년</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
