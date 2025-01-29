import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

export default function AgeInputPage() {
  const [age, setAge] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const ageNum = parseInt(age);
    if (age === "") {
      setIsValid(false);
      setError("");
    } else if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 120) {
      setIsValid(false);
      setError("현실적인 나이를 입력해주세요!");
    } else {
      setIsValid(true);
      setError("");
    }
  }, [age]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      const encodedAge = encodeURIComponent(age);
      navigate(`/inputPage?age=${encodedAge}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter">
              {/* 0부터 60까지 랜덤 숫자 생성해서 애니메이션으로 넣기 */}
              당신의 삶은 O년 남았습니다.
            </h1>
            <p className="text-muted-foreground">
              나이를 입력하고 남은 시간을 확인해보세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="나이를 입력하세요"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-lg"
                min="1"
                max="120"
              />
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isValid}
              size="lg"
            >
              계산하기
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
