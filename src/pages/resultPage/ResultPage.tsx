import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { useLocation } from "react-router-dom";

export function ResultPage() {
  const { search } = useLocation();
  const categories = JSON.parse(decodeURIComponent(search.split('=')[1]));

  return (
    <Layout>
      <Title title="당신의 남은 삶입니다." subTitle="100살까지 산다고 가정했을 때 남은 삶입니다. 원 하나는 일주일입니다." />
      
    </Layout>
  );
}
