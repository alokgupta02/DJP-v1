import { useState } from "react";
import { FileText, Clock, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchPetitions, signPetition } from "./petitionsApi";

const FILTER_TABS = ["Trending", "Recent", "Near Me", "Signed", "Created"];

export default function PetitionsPage() {
  const [activeTab, setActiveTab] = useState("Trending");
  const queryClient = useQueryClient();

  const { data: petitions = [], isLoading } = useQuery({
    queryKey: ["petitions"],
    queryFn: fetchPetitions,
  });

  const signMutation = useMutation({
    mutationFn: signPetition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["petitions"] });
    },
  });

  const daysLeft = (expiresAt: string) =>
    Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 pb-0">
        <div className="flex items-end justify-between w-full mb-6">
          <div>
            <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Petitions</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Add your voice to community petitions or start a new one.</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap",
                activeTab === tab
                  ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[var(--color-brand)]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {petitions.length === 0 && (
              <div className="col-span-full text-center py-20 text-[var(--color-text-secondary)]">
                No petitions yet. Start one!
              </div>
            )}
            {petitions.map((p) => {
              const pct = Math.min(100, Math.round((p.signatureCount / p.signatureGoal) * 100));
              const dl = daysLeft(p.expiresAt);
              return (
                <div key={p.id} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-brand)] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-[11px] font-semibold">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-secondary)]">
                      <Clock size={12} />
                      {dl} days left
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[var(--color-text-primary)] leading-snug">{p.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">{p.description}</p>

                  <div className="mt-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-[var(--color-text-primary)]">{p.signatureCount.toLocaleString()} signatures</span>
                      <span className="text-[var(--color-text-secondary)]">Goal: {p.signatureGoal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <FileText size={14} />
                      {p.author}
                    </div>
                    <button
                      onClick={() => signMutation.mutate(p.id)}
                      disabled={signMutation.isPending}
                      className="bg-[var(--color-brand)] text-[var(--color-text-inverse)] px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {signMutation.isPending ? <Loader2 className="animate-spin inline" size={14} /> : "Sign"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
