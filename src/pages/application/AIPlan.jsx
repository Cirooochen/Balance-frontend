import React, { useMemo, useState } from "react";
import { useLoaderData, redirect, Link, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";

export async function aiPlanloader() {
  const raw = sessionStorage.getItem("last_ai_plan");
  if (!raw) return redirect("/dashboard/allowance");
  try {
    return JSON.parse(raw);
  } catch {
    sessionStorage.removeItem("last_ai_plan");
    return redirect("/dashboard/allowance");
  }
}

export default function AIPlan() {
  const { user, indulgences, plan } = useLoaderData();
  const navigate = useNavigate();

  // ✅ keep the category that AI produced so dashboards & images are right
  const [acts, setActs] = useState(
    (plan?.habitsToAdd || []).map((h, i) => ({
      id: `a${i}`,
      name: h.name,
      category: h.category || "movement",
      targetPerWeek: clamp(h.targetPerWeek ?? 1, 1, 14),
    }))
  );

  const avgTarget = useMemo(() => {
    if (!acts.length) return 0;
    const sum = acts.reduce((s, a) => s + a.targetPerWeek, 0);
    return Math.round((sum / (acts.length * 14)) * 100);
  }, [acts]);

  const setTarget = (idx, delta) =>
    setActs((prev) =>
      prev.map((a, i) =>
        i === idx
          ? { ...a, targetPerWeek: clamp(a.targetPerWeek + delta, 1, 14) }
          : a
      )
    );

  async function handleGetStarted() {
    const saved = {
      ...plan,
      // 🔁 send back name + targetPerWeek + category
      habitsToAdd: acts.map(({ name, targetPerWeek, category }) => ({
        name,
        targetPerWeek,
        category,
      })),
    };
    const { data } = await customFetch.post("/plan", { plan: saved });
    sessionStorage.setItem("active_plan", JSON.stringify(data.plan));
    navigate("/dashboard");
  }

  return (
    <div className="mx-auto max-w-[680px] p-4">
      {plan?.summary && (
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-900/20 text-emerald-100 p-4 mb-4">
          <p className="text-sm leading-relaxed">{plan.summary}</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 mb-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <span className="font-semibold">Need more efforts</span>
          <span className="text-xs px-2 py-1 rounded-full border border-emerald-400/40 bg-teal-900/30">
            Doing great
          </span>
        </div>
        <div className="px-4 py-5">
          <div
            className="mx-auto grid place-items-center rounded-full border-[10px] border-slate-950 w-40 h-40"
            style={{
              background: `conic-gradient(#10b981 ${avgTarget}%, #233147 ${avgTarget}%)`,
            }}
          >
            <div className="text-3xl font-extrabold">
              {Math.max(5, avgTarget)}%
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Average weekly target across habits
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40">
        <div className="px-4 py-3 border-b border-slate-800 font-semibold">
          You customized health acts plan
        </div>
        <div className="p-4 space-y-3">
          {acts.map((h, i) => (
            <div
              key={h.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
            >
              <div className="font-semibold">🪄 {h.name}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTarget(i, -1)}
                  className="w-9 h-9 grid place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100"
                  aria-label={`Decrease weekly target for ${h.name}`}
                >
                  –
                </button>
                <div className="flex items-baseline justify-center gap-1 w-20">
                  <span className="text-lg font-extrabold">
                    {h.targetPerWeek}
                  </span>
                  <span className="text-[11px] text-slate-400">/ week</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTarget(i, +1)}
                  className="w-9 h-9 grid place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100"
                  aria-label={`Increase weekly target for ${h.name}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {Array.isArray(plan?.microActions) &&
            plan.microActions.length > 0 && (
              <div className="pt-2">
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  Micro-actions
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {plan.microActions.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

          <div className="flex gap-2 pt-2">
            <Link
              to="/dashboard/allowance"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 py-3 text-center"
            >
              Edit selections
            </Link>
            <button
              onClick={handleGetStarted}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-slate-900 font-bold py-3"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-slate-400 text-sm">
          Debug: input indulgences
        </summary>
        <pre className="mt-2 rounded-xl bg-slate-900/80 border border-slate-800 p-3 text-xs overflow-x-auto">
          {JSON.stringify(indulgences, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function clamp(n, min, max) {
  n = Math.round(Number(n) || 0);
  return Math.max(min, Math.min(max, n));
}
