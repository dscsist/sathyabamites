import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  monthlyGrowth: number;
  accent: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, suffix = "", monthlyGrowth, accent, icon: Icon }: StatCardProps) {
  return (
    <div className="glass-panel group rounded-lg p-4 transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/40 hover:shadow-glow">
      <div className="flex items-center gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${accent} text-white shadow-glow`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            {value}
            {suffix}
          </p>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-xs text-slate-400">
            <span className="font-semibold text-emerald-300">↑ {monthlyGrowth}</span> this month
          </p>
        </div>
      </div>
    </div>
  );
}
