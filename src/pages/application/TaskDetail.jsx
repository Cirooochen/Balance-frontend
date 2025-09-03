import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { getActMeta } from "../../utils/actMeta";

// Loader: fetch act info for this route
export async function detailLoader({ params }) {
  console.log(params);
  const { data } = await customFetch.get(`/plan/active/act/${params.actId}`);
  // -> { planId, act: { id, name, target, done, history:[] } }
  return data;
}

export default function TaskDetail() {
  const { planId, act } = useLoaderData();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const finished = act.done >= act.target;
  const meta = getActMeta(act.name);

  async function handleCheckIn() {
    if (busy || finished) return;
    setBusy(true);
    try {
      await customFetch.post(`/plan/${planId}/act/${act.id}/checkin`);
      // go back to the overview so the gauge/cards refresh:
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("check-in failed", err?.response?.data || err.message);
      alert("Could not mark as done. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-[960px] p-4">
      {/* hero */}
      <div className="rounded-2xl overflow-hidden relative h-56 mb-4">
        <img alt="" className="w-full h-full object-cover" src={meta.img} />

        <div className="absolute bottom-3 left-4 text-white">
          <div className="text-[11px] bg-black/40 px-2 py-1 rounded-full inline-block mb-1">
            {meta.label}
          </div>
          <div className="text-2xl font-extrabold drop-shadow">{act.name}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
          <div className="text-xs text-slate-400 mb-1">Balance out</div>
          <div className="font-semibold">Your healthier choice</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-right">
          <div className="text-xs text-slate-400 mb-1">Progress</div>
          <div className="text-2xl font-extrabold">
            {act.done}/{act.target}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 mb-6">
        <div className="font-semibold mb-1">What experts say</div>
        <p className="text-sm text-slate-300">
          Regular movement boosts energy and mood. Keep it short and consistent.
        </p>
      </div>

      <button
        onClick={handleCheckIn}
        disabled={busy || finished}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-slate-900 font-bold py-3 disabled:opacity-70"
      >
        {finished ? "Completed ✓" : busy ? "Saving…" : "Mark as done"}
      </button>
    </div>
  );
}
