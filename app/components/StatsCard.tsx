import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

export function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-[#FFD700]/50 transition-all">
      <Icon className="w-8 h-8 text-[#FFD700] mb-3" />
      <p className="text-gray-400">{label}</p>
      <p className="text-3xl font-bold text-[#FFD700]">{value}</p>
    </div>
  );
}