import { Crown } from "lucide-react";
import type { Contributor } from "@/lib/dashboard/types";

interface RankedContributor extends Contributor {
  points: number;
}

interface TopContributorsProps {
  contributors: RankedContributor[];
}

export function TopContributors({ contributors }: TopContributorsProps) {
  const topPoints = contributors[0]?.points ?? 1;

  return (
    <section className="glass-panel rounded-[1rem] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">Top Contributors</h2>
        <button type="button" className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200">
          View All
        </button>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
        <div className="space-y-2">
          {contributors.map((contributor, index) => (
            <article key={contributor.id} className="grid grid-cols-[2.5rem_2.75rem_minmax(0,1fr)] items-center gap-3 rounded-lg p-2 transition hover:bg-white/[0.04] sm:grid-cols-[2.5rem_2.75rem_minmax(0,1fr)_10rem_4.8rem]">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-sm font-bold text-slate-200 ring-1 ring-white/10">
                {index === 0 ? <Crown className="h-5 w-5 text-orange-300" /> : index + 1}
              </div>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500/70 to-blue-500/70 text-xs font-bold text-white">
                {contributor.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{contributor.name}</p>
                <p className="truncate text-xs text-slate-400">{contributor.departmentYear}</p>
              </div>
              <div className="hidden h-2 rounded-full bg-slate-800 sm:block">
                <div
                  className="h-full rounded-full bg-violet-500 shadow-glow"
                  style={{ width: `${Math.max(12, Math.round((contributor.points / topPoints) * 100))}%` }}
                />
              </div>
              <div className="col-span-3 text-right sm:col-span-1">
                <p className="text-sm text-slate-200">{contributor.points.toLocaleString("en-IN")} pts</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
