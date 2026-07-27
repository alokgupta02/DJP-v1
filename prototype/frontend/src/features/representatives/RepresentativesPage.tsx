import { MapPin, Phone, Mail, Building, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchRepresentatives } from "./representativesApi";

const AVATAR_BG: Record<string, string> = {
  purple: "bg-purple-100", blue: "bg-blue-100", green: "bg-green-100",
  amber: "bg-amber-100", rose: "bg-rose-100", cyan: "bg-cyan-100",
};
const AVATAR_TEXT: Record<string, string> = {
  purple: "text-purple-700", blue: "text-blue-700", green: "text-green-700",
  amber: "text-amber-700", rose: "text-rose-700", cyan: "text-cyan-700",
};

export default function RepresentativesPage() {
  const { data: reps = [], isLoading } = useQuery({
    queryKey: ["representatives"],
    queryFn: fetchRepresentatives,
  });

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Your Representatives</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Contact and track the performance of your elected representatives.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[var(--color-brand)]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reps.length === 0 && (
              <div className="col-span-full text-center py-20 text-[var(--color-text-secondary)]">
                No representatives found for your area.
              </div>
            )}
            {reps.map((rep) => {
              const bgKey = (rep.avatarBg || "purple").toLowerCase();
              return (
                <div key={rep.id} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-2 bg-[var(--color-brand)]" />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0", AVATAR_BG[bgKey] || "bg-purple-100", AVATAR_TEXT[bgKey] || "text-purple-700")}>
                        {rep.imageInitials || rep.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--color-text-primary)]">{rep.name}</h3>
                        <p className="text-sm text-[var(--color-brand)] font-medium">{rep.position}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <MapPin size={14} />
                        {rep.ward}
                      </div>
                      <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <Building size={14} />
                        {rep.party}
                      </div>
                      <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <Calendar size={14} />
                        Since {rep.since}
                      </div>
                      <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <Phone size={14} />
                        {rep.phone}
                      </div>
                      <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                        <Mail size={14} />
                        {rep.email}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--color-border)] grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <p className="text-lg font-bold text-[var(--color-text-primary)]">{rep.issuesResolved.toLocaleString()}</p>
                        <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight">Issues Resolved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-[var(--color-text-primary)]">{rep.meetingsHeld}</p>
                        <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight">Meetings Held</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-[var(--color-text-primary)]">{rep.attendance}</p>
                        <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight">Attendance</p>
                      </div>
                    </div>

                    <button className="w-full mt-5 bg-[var(--color-brand)] text-[var(--color-text-inverse)] py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                      Contact Representative
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
