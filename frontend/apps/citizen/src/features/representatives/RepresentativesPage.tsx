import { MapPin, Phone, Mail, Building, Calendar } from "lucide-react";
import clsx from "clsx";

const REPS = [
  {
    name: "Smt. Meera Devi", position: "Ward Councilor", ward: "Ward 42 — South Delhi",
    party: "Independent", since: "2020", phone: "+91 98765 43210", email: "meera.devi@ward42.in",
    image: "MD", bg: "bg-purple-100", textColor: "text-purple-700",
    stats: [
      { label: "Issues Resolved", value: "847" },
      { label: "Meetings Held", value: "124" },
      { label: "Attendance", value: "96%" },
    ],
  },
  {
    name: "Shri. Rajesh Kumar", position: "MLA", ward: "South Delhi Constituency",
    party: "Aam Aadmi Party", since: "2019", phone: "+91 98765 43211", email: "rajesh.kumar@delhi.gov.in",
    image: "RK", bg: "bg-blue-100", textColor: "text-blue-700",
    stats: [
      { label: "Bills Proposed", value: "18" },
      { label: "Constituency Visits", value: "56" },
      { label: "Public Meetings", value: "89" },
    ],
  },
  {
    name: "Adv. Sunita Sharma", position: "Municipal Committee Chairperson", ward: "Zone 3 — South Zone",
    party: "Independent", since: "2021", phone: "+91 98765 43212", email: "sunita.sharma@mcd.gov.in",
    image: "SS", bg: "bg-green-100", textColor: "text-green-700",
    stats: [
      { label: "Budgets Approved", value: "₹2.4Cr" },
      { label: "Projects Initiated", value: "34" },
      { label: "Grievances Addressed", value: "1,203" },
    ],
  },
];

export default function RepresentativesPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)]">Your Representatives</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Contact and track the performance of your elected representatives.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REPS.map((rep) => (
            <div key={rep.name} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-2 bg-[var(--color-brand)]" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0", rep.bg, rep.textColor)}>
                    {rep.image}
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
                  {rep.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-bold text-[var(--color-text-primary)]">{s.value}</p>
                      <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-5 bg-[var(--color-brand)] text-[var(--color-text-inverse)] py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                  Contact Representative
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
