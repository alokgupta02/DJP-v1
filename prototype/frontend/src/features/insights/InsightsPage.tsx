import { TrendingDown, Star, TrendingUp, Minus, CheckCircle, AlertTriangle, Lightbulb, Heart, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { fetchInsights } from "./insightsApi";

export default function InsightsPage() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--color-brand)]" size={32} />
      </div>
    );
  }

  if (!insights) return null;

  const BARS = insights.resolutionTrends;
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[var(--text-heading)] font-bold text-[var(--color-text-primary)] mb-1">Civic Insights</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Data-driven overview of municipal performance and citizen engagement.</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--color-bg-subtle)] p-2 rounded-lg">
          <select className="bg-transparent border-none text-sm outline-none cursor-pointer text-[var(--color-text-primary)]">
            <option>This Month</option>
            <option>Last Quarter</option>
            <option>This Year</option>
          </select>
          <div className="h-6 w-px bg-[var(--color-border)]" />
          <select className="bg-transparent border-none text-sm outline-none cursor-pointer text-[var(--color-text-primary)]">
            <option>All Wards</option>
            <option>Ward 12 (North)</option>
            <option>Ward 45 (Central)</option>
          </select>
          <div className="h-6 w-px bg-[var(--color-border)]" />
          <button className="flex items-center gap-1 text-sm px-3 py-1 hover:bg-[var(--color-bg-muted)] rounded transition-colors text-[var(--color-text-primary)]">
            Departments
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[var(--color-bg-subtle)] p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="relative w-20 h-20 mb-3">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="transparent" stroke="var(--color-border)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="32" fill="transparent" stroke="var(--color-brand)" strokeWidth="6" strokeLinecap="round" strokeDasharray="201" strokeDashoffset={201 - (insights.resolutionRate / 100) * 201} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-[var(--color-text-primary)]">{insights.resolutionRate}%</div>
              </div>
            <span className="text-xs text-[var(--color-text-secondary)]">Resolution Rate</span>
          </div>

          {[
            { label: "Avg Response Time", value: String(insights.avgResponseTimeDays), unit: "Days", trend: "12% improvement", up: true },
            { label: "Citizen Satisfaction", value: String(insights.citizenSatisfaction), unit: "/ 5", stars: true },
            { label: "Issues Reported", value: insights.issuesReported.toLocaleString(), quota: "67% of monthly quota" },
          ].map((metric) => (
            <div key={metric.label} className="bg-[var(--color-bg-subtle)] p-4 rounded-xl">
              <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">{metric.label}</span>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-[var(--text-display)] font-bold text-[var(--color-text-primary)]">{metric.value}</h3>
                {metric.unit && <span className="text-sm text-[var(--color-text-secondary)]">{metric.unit}</span>}
              </div>
              {metric.trend && (
                <div className="flex items-center gap-1 text-[var(--color-brand)] mt-2">
                  <TrendingDown size={14} />
                  <span className="text-xs">{metric.trend}</span>
                </div>
              )}
              {metric.stars && (
                <div className="flex gap-0.5 mt-2 text-[var(--color-brand)]">
                  {[1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  <Star size={14} fill="currentColor" opacity={0.5} />
                </div>
              )}
              {metric.quota && (
                <div className="mt-2">
                  <div className="w-full h-1 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand)] w-2/3 rounded-full" />
                  </div>
                  <span className="text-[11px] text-[var(--color-text-secondary)] mt-1 block">{metric.quota}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-bg-subtle)] p-6 rounded-xl col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-base font-bold text-[var(--color-text-primary)]">Resolution Trends</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-xs"><span className="w-3 h-3 bg-[var(--color-brand)] rounded-full" /> Reported</div>
                <div className="flex items-center gap-1 text-xs"><span className="w-3 h-3 bg-[var(--color-brand)]/20 rounded-full" /> Resolved</div>
              </div>
            </div>
            <div className="w-full h-64 flex items-end justify-between gap-1">
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 bg-[var(--color-brand)]/20 rounded-t relative group cursor-pointer" style={{ height: `${h}%` }}>
                  <div className="absolute inset-x-0 top-0 h-2 bg-[var(--color-brand)] rounded-t hidden group-hover:block" />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-[var(--color-text-secondary)]">
              <span>1st Nov</span><span>8th Nov</span><span>15th Nov</span><span>22nd Nov</span><span>30th Nov</span>
            </div>
          </div>

          <div className="bg-[var(--color-bg-subtle)] p-6 rounded-xl">
            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-6">Category Breakdown</h4>
            <div className="space-y-4">
              {insights.categoryBreakdown.length > 0 ? insights.categoryBreakdown.map((cat) => (
                <div key={cat.label} className="space-y-1">
                  <div className="flex justify-between text-sm"><span className="text-[var(--color-text-primary)]">{cat.label}</span><span className="text-[var(--color-text-secondary)]">{cat.count.toLocaleString()}</span></div>
                  <div className="w-full h-2 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              )) : <p className="text-sm text-[var(--color-text-secondary)]">No data</p>}
            </div>
          </div>

          <div className="bg-[var(--color-bg-subtle)] p-6 rounded-xl">
            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-6">Department Efficiency</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                  <th className="pb-2 font-medium">Department</th>
                  <th className="pb-2 font-medium">Rate</th>
                  <th className="pb-2 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {insights.departmentEfficiency.map((row) => (
                  <tr key={row.dept} className="border-b border-[var(--color-border)]/30">
                    <td className="py-3 text-[var(--color-text-primary)]">{row.dept}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--color-text-primary)]">{row.rate}%</span>
                        <div className="w-16 h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-brand)] rounded-full" style={{ width: `${row.rate}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      {row.trend === "up" && <TrendingUp size={16} className="text-[var(--color-error)] ml-auto" />}
                      {row.trend === "flat" && <Minus size={16} className="text-[var(--color-text-secondary)] ml-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <section className="bg-[var(--color-bg-subtle)] p-6 rounded-xl border-l-4 border-[var(--color-brand)] shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-brand)]">
              <Lightbulb size={18} />
              <h4 className="text-base font-bold">AI Insights</h4>
            </div>
            <ul className="space-y-4">
              {[
                { icon: CheckCircle, text: insights.aiInsights[0] || "No insights available." },
                { icon: AlertTriangle, text: insights.aiInsights[1] || "" },
                { icon: Lightbulb, text: insights.aiInsights[2] || "" },
              ].filter(i => i.text).map((item) => (
                <li key={item.text} className="flex gap-3">
                  <item.icon size={16} className="text-[var(--color-brand)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--color-text-primary)]">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-[var(--color-bg-subtle)] p-6 rounded-xl">
            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-6">Top Active Wards</h4>
            <div className="space-y-4">
              {insights.topWards.map((ward) => (
                <div key={ward.name} className="flex items-center gap-4">
                  <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", ward.rank === 1 ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]")}>{ward.rank}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{ward.name}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">{ward.interactions} Interactions</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[var(--color-text-primary)] text-white p-6 rounded-xl overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-base font-bold mb-1">Community Impact</h4>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-widest opacity-80">Volunteer Hours</p>
                <h3 className="text-[40px] font-bold leading-tight">{insights.volunteerHours.toLocaleString()}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Heart size={16} className="text-[var(--color-brand-light)]" />
                <span className="text-sm">{insights.activeProjects} active projects</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[var(--color-brand)]/20 rounded-full blur-2xl" />
          </section>
        </div>
      </div>
    </div>
  );
}
