import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 text-center text-slate-300">
      <SearchX className="mx-auto mb-3 h-8 w-8 text-violet-300" aria-hidden="true" />
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}
