import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { getActMeta } from "../../utils/actMeta";
import { useDashboardContext } from "../../context/DashboardContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useDashboardContext();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 When user changes (login as someone else), clear old plan and refetch
  useEffect(() => {
    let alive = true;
    setPlan(null);
    setLoading(true);

    (async () => {
      try {
        const { data } = await customFetch.get("/plan/active", {
          // bust any browser/proxy cache aggressively
          params: { t: Date.now() },
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        if (!alive) return;

        const p = data?.plan || null;
        if (!p) {
          navigate("/dashboard/allowance", { replace: true });
          return;
        }
        setPlan(p);
      } catch {
        if (alive) navigate("/dashboard/allowance", { replace: true });
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [navigate, user?._id]); // 👈 refetch whenever the authenticated user changes

  const today = new Date();
  const weekday = today.toLocaleDateString(undefined, { weekday: "long" });
  const dateStr = today.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });

  const { acts, percent } = useMemo(() => {
    const list = Array.isArray(plan?.acts) ? plan.acts : [];
    const totalTarget = list.reduce((s, a) => s + (a.target || 0), 0);
    const totalDone = list.reduce((s, a) => s + (a.done || 0), 0);
    return {
      acts: list,
      percent: totalTarget ? Math.round((totalDone / totalTarget) * 100) : 0,
    };
  }, [plan]);

  return (
    <div className="mx-auto max-w-[960px] p-4">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm">Welcome,</p>
          <h2 className="text-2xl font-bold">{user?.name || "Friend"}</h2>
        </div>
        <div className="text-right">
          <div className="text-slate-400 text-sm">{weekday}</div>
          <div className="text-slate-300">{dateStr}</div>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-56 rounded-2xl bg-slate-800/40" />
          <div className="h-60 rounded-2xl bg-slate-800/40" />
        </div>
      )}

      {!loading && plan && (
        <>
          {/* Gauge */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 mb-6">
            <div className="px-4 pt-4">
              <div
                className="mx-auto grid place-items-center rounded-full border-[10px] border-slate-950 w-44 h-44"
                style={{
                  background: `conic-gradient(#10b981 ${percent}%, #233147 ${percent}%)`,
                }}
              >
                <div className="text-3xl font-extrabold">{percent}%</div>
              </div>
              <p className="text-center text-xs text-slate-400 mt-2 pb-4">
                Average weekly target across habits
              </p>
            </div>
            <div className="px-4 pb-4 flex items-center justify-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full border border-slate-700 bg-slate-900">
                Healthy acts
              </span>
              <span className="text-xs px-2 py-1 rounded-full border border-slate-700 bg-slate-900">
                Weekly allowances
              </span>
            </div>
          </div>

          {/* Weekly balance moves */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="px-4 py-3 border-b border-slate-800 font-semibold">
              Your weekly balance moves
            </div>

            <div className="p-4 overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[240px] gap-3">
                {acts.map((a) => {
                  // ⛳ we prefer category, fall back to name if missing
                  const meta = getActMeta(a.category || a.name);
                  return (
                    <Link
                      key={a.id}
                      to={`act/${a.id}`}
                      className="relative h-40 rounded-2xl overflow-hidden border border-white/10"
                      style={{
                        backgroundImage: `linear-gradient(120deg, rgba(2,6,23,.70), rgba(2,6,23,.25)), url('${meta.img}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute right-2 top-2 bg-black/40 border border-white/20 text-white text-xs px-2 py-1 rounded-full">
                        {a.done}/{a.target}
                      </div>
                      <div className="absolute left-3 top-3 text-[11px] bg-black/35 px-2 py-1 rounded-full">
                        {meta.label}
                      </div>
                      <div className="absolute left-3 bottom-3 font-extrabold drop-shadow text-white">
                        {a.name}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex gap-2 mt-4">
                <Link
                  to="aiplan"
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 py-3 text-center"
                >
                  Adjust plan
                </Link>
                <Link
                  to="report"
                  className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-slate-900 font-bold py-3 text-center"
                >
                  Weekly report
                </Link>
              </div>
            </div>
          </div>

          {/* Tips */}
          {Array.isArray(plan.microActions) && plan.microActions.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {plan.microActions.slice(0, 2).map((tip, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="font-semibold mb-1">Tip #{idx + 1}</div>
                  <p className="text-sm text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
