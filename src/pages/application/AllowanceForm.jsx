// src/pages/application/AllowanceForm.jsx
import React, { useState } from "react";
import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import customFetch from "../../utils/customFetch";

/* ---------- loader: categories + items ---------- */
export async function allowanceLoader() {
  const { data } = await customFetch.get("/allowances/indulgences");
  return data; // { categories: [...] }
}

/* ---------- action: call AI, stash result, go to aiplan ---------- */
export async function allowanceAction({ request }) {
  const form = await request.formData();

  const indulgences = [];
  for (const [k, v] of form.entries()) {
    if (!k.startsWith("count-")) continue;
    const key = k.slice("count-".length);
    const n = Number(v || 0);
    if (n <= 0) continue;

    const t = form.get(`type-${key}`) || "timesPerWeek";
    indulgences.push(
      t === "hoursPerDay"
        ? { category: key, hoursPerDay: n }
        : { category: key, timesPerWeek: n }
    );
  }

  // POST to /ai/plan at the server root (NOT /api/v1)
  const AI_BASE = customFetch.defaults.baseURL.replace(/\/api\/v1$/, "");
  const { data: payload } = await customFetch.post(
    "/ai/plan",
    { indulgences }, // ✅ correct body shape
    { baseURL: AI_BASE } // ✅ correct base (server root)
  );

  sessionStorage.setItem("last_ai_plan", JSON.stringify(payload));
  return redirect("/dashboard/aiplan"); // ✅ absolute path
}

/* ------------------------ UI ------------------------ */
export default function AllowanceForm() {
  const { categories } = useLoaderData();
  const nav = useNavigation();

  return (
    <div className="mx-auto max-w-[680px] p-4">
      <h1 className="text-2xl font-bold mb-2">Set Your Weekly Allowance</h1>
      <p className="text-sm text-slate-400 mb-4">
        Pick items and set weekly amounts.
      </p>

      <Form method="post" replace>
        {categories.map((cat) => (
          <section key={cat._id} className="mt-6">
            <div className="text-[13px] uppercase tracking-wide text-slate-400 mb-2">
              {cat.name}
            </div>

            <div className="grid gap-3">
              {cat.items.map((item) => (
                <ItemRow key={item.key} item={item} />
              ))}
            </div>
          </section>
        ))}

        <button
          type="submit"
          disabled={nav.state === "submitting"}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-slate-900 font-bold py-3 disabled:opacity-70"
        >
          {nav.state === "submitting" ? "Creating plan…" : "Continue"}
        </button>
      </Form>
    </div>
  );
}

function ItemRow({ item }) {
  const [count, setCount] = useState(0);

  // Treat screen/gaming items as hours/day; everything else times/week
  const isHours =
    /screen|scroll|gaming|video/i.test(item.key) || /hour/i.test(item.name);
  const unitLabel = isHours ? "hours/day" : "times/week";
  const max = isHours ? 24 : 21;

  const dec = () => setCount((n) => Math.max(0, n - 1));
  const inc = () => setCount((n) => Math.min(max, n + 1));

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-lg">{item.emoji || "•"}</span>
        <div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-xs text-slate-400">{unitLabel}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          className="w-9 h-9 grid place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100"
        >
          –
        </button>
        <div className="w-10 text-center font-bold">{count}</div>
        <button
          type="button"
          onClick={inc}
          className="w-9 h-9 grid place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100"
        >
          +
        </button>
      </div>

      {/* Hidden fields for the action */}
      <input type="hidden" name={`count-${item.key}`} value={count} />
      <input
        type="hidden"
        name={`type-${item.key}`}
        value={isHours ? "hoursPerDay" : "timesPerWeek"}
      />
    </div>
  );
}
