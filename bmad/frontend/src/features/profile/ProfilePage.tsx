import { MapPin, Edit3, Share2, Phone, Mail, Home, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function ProfilePage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <header className="w-full bg-[var(--color-bg-muted)] rounded-xl p-6 flex items-center justify-between border border-[var(--color-border)] shadow-sm overflow-hidden relative">
        <div className="flex items-center gap-6 z-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-[var(--color-brand)] p-1 bg-[var(--color-bg-page)]">
              <div className="w-full h-full rounded-full bg-[var(--color-brand-light)] flex items-center justify-center text-3xl font-bold text-[var(--color-brand)]">AM</div>
            </div>
            <div className="absolute bottom-0 right-0 bg-[var(--color-brand)] text-white p-1.5 rounded-full border-2 border-[var(--color-bg-page)]">
              <ShieldCheck size={14} />
            </div>
          </div>
          <div>
            <h2 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)]">Arjun Malhotra</h2>
            <div className="flex items-center gap-2 mt-1">
              <MapPin size={16} className="text-[var(--color-brand)]" />
              <p className="text-base text-[var(--color-text-secondary)]">Ward 42 - South Delhi</p>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="bg-[var(--color-brand-light)] text-[var(--color-brand)] px-3 py-1 rounded-full text-[11px] font-bold">ACTIVE CITIZEN</span>
              <span className="bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full text-[11px] font-bold">PLATINUM MEMBER</span>
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col gap-2">
          <button className="bg-[var(--color-brand)] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 text-sm">
            <Edit3 size={16} />
            Edit Profile
          </button>
          <button className="bg-[var(--color-bg-surface)] text-[var(--color-brand)] border border-[var(--color-brand)] px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[var(--color-bg-subtle)] transition-all active:scale-95 text-sm">
            <Share2 size={16} />
            Share Stats
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("djp_user");
              window.location.href = "/login";
            }}
            className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-hover)] p-6 text-white shadow-md hover:scale-[1.02] transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-3xl font-bold opacity-80">📢</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[11px]">+2 this month</span>
          </div>
          <div className="mt-6">
            <h3 className="text-[56px] leading-tight font-bold">12</h3>
            <p className="text-lg opacity-90">Issues Reported</p>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[75%] rounded-full" />
            </div>
            <span className="text-[11px]">8 Resolved</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand)]">
              <MessageSquareIcon />
            </div>
            <div>
              <h3 className="text-[var(--text-display)] leading-none font-bold text-[var(--color-text-primary)]">05</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Discussions Created</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]/30">
            <p className="text-[11px] text-[var(--color-text-secondary)] italic">"Arjun's discussion on Waste Management reached 45 neighbors."</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-[var(--color-bg-surface)] rounded-xl p-6 border border-[var(--color-border)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--color-brand)] text-white">
              <VoteIcon />
            </div>
            <div>
              <h3 className="text-[var(--text-display)] leading-none font-bold text-[var(--color-text-primary)]">08</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Polls Created</p>
            </div>
          </div>
          <div className="mt-4 flex -space-x-2 items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-subtle)]" />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-bg-muted)]" />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--color-brand-light)] flex items-center justify-center text-[10px] font-bold text-[var(--color-brand)]">120+</div>
            <p className="ml-4 text-[11px] text-[var(--color-text-secondary)] self-center">Participated in your polls</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <section className="col-span-12 lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Achievements</h3>
            <button className="text-[var(--color-brand)] font-bold text-xs hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🏆", title: "Civic Hero", desc: "First 10 verified issues reported", color: "bg-[var(--color-brand-light)]" },
              { icon: "⭐", title: "Top Contributor", desc: "Awarded by Ward Councilor", color: "bg-[var(--color-bg-subtle)]" },
              { icon: "🏅", title: "Poll Master", desc: "Engaged over 500 citizens", color: "bg-[var(--color-bg-subtle)]" },
            ].map((badge) => (
              <div key={badge.title} className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-6 rounded-xl flex flex-col items-center text-center shadow-sm hover:border-[var(--color-brand)] transition-colors cursor-pointer group">
                <div className={clsx("w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", badge.color)}>
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-text-primary)]">{badge.title}</h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-2 leading-tight">{badge.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Account Details</h3>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Mobile Number", value: "+91 98765 43210" },
                { icon: Mail, label: "Email Address", value: "arjun.m@civicmail.in" },
                { icon: Home, label: "Primary Address", value: "Flat 402, Block C, Green View Apartments, Saket, New Delhi 110017" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <item.icon size={18} className="text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
                  <div className="flex-grow min-w-0">
                    <p className="text-[11px] text-[var(--color-text-secondary)]">{item.label}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-[var(--color-text-primary)]">{item.value}</span>
                      <Edit3 size={14} className="text-[var(--color-brand)] cursor-pointer hover:scale-110 transition-transform shrink-0 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4 pt-4 border-t border-[var(--color-border)]">
                <MapPin size={18} className="text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <p className="text-[11px] text-[var(--color-text-secondary)]">Registered Ward</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">Ward 42 (South Delhi)</span>
                    <span className="bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] px-3 py-1 rounded text-[11px]">LOCKED</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">Ward changes require address verification.</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 border-2 border-[var(--color-border)] text-[var(--color-text-primary)] py-3 rounded-full font-bold hover:bg-[var(--color-bg-subtle)] transition-all active:scale-95 text-sm">
              Download Citizen Profile PDF
            </button>
          </div>
        </section>
      </div>

      <section className="mt-8 mb-10">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Recent Activity</h3>
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/30">
              {[
                { date: "Oct 24, 2023", icon: "⚠️", text: 'Reported "Pothole on Main Market Road"', status: "IN REVIEW", statusClass: "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]" },
                { date: "Oct 21, 2023", icon: "🗳️", text: 'New Poll: "Proposed Park Renovation Plan"', status: "LIVE", statusClass: "bg-[var(--color-brand-light)] text-[var(--color-brand)]" },
                { date: "Oct 18, 2023", icon: "✅", text: 'Issue Resolved: "Street Light Outage"', status: "COMPLETED", statusClass: "bg-green-100 text-green-800" },
              ].map((row) => (
                <tr key={row.date} className="hover:bg-[var(--color-bg-subtle)] transition-colors">
                  <td className="px-6 py-4 text-sm text-[var(--color-text-primary)]">{row.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span>{row.icon}</span>
                      <span className="text-sm text-[var(--color-text-primary)]">{row.text}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx("px-3 py-1 rounded-full text-[11px] font-bold", row.statusClass)}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--color-brand)] hover:underline font-bold text-sm">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function VoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  );
}
