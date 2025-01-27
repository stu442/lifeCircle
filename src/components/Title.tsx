export default function Title({ title, subTitle }: { title: string, subTitle?: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {subTitle && <p className="text-gray-600 mb-8">{subTitle}</p>}
    </div>
  );
}
