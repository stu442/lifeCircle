export function CategoryIcon({ icon, color }: { icon: string, color: string }) {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: color }}>
      {icon}
    </div>
  );
}