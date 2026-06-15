"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

type Topic = {
  title: string;
  questions: string[];
};

const TOPICS: Topic[] = [
  {
    title: "Weight Loss with GLP-1 Medications (Semaglutide, Tirzepatide, Retatrutide)",
    questions: [
      "Tell me about your background and Beyond Stem Cells' experience with medical weight loss. How long have you offered GLP-1 therapy, roughly how many patients have you treated, and what makes your program different from a med spa that just hands out injections?",
      "In plain language, how do GLP-1 and dual/triple agonist medications actually cause weight loss, and how do you explain the differences between Semaglutide, Tirzepatide, and Retatrutide to a patient deciding which to start?",
      "Share a patient success story. Who came in, what had they tried before, what did you put them on, what results did they see, and what was the emotional payoff for them?",
      "What's your honest opinion or hot take on GLP-1 weight loss (compounded vs. brand-name, stopping too soon, muscle loss, clinic-supervised vs. DIY)?",
      "Walk me through the practical details: starting the program (consult, labs, dosing), cost/what's included, who is and isn't a candidate, side effects you manage, and the call-to-action.",
    ],
  },
  {
    title: "Semaglutide for Weight Loss: How It Works and What to Expect",
    questions: [
      "What is your clinic's specific experience prescribing and managing Semaglutide, and your philosophy on using it within a broader wellness plan?",
      "How does Semaglutide reduce appetite and 'food noise,' and how do you set realistic expectations on how much and how fast patients lose?",
      "Tell me about a memorable Semaglutide patient: starting point, how you adjusted their dose, and their outcome.",
      "What do you wish every patient knew before starting Semaglutide that social media gets wrong? Opinions on dosing, plateaus, or maintenance?",
      "Practicals: titration schedule, cost/what's included, candidacy and contraindications, handling nausea, and how to book.",
    ],
  },
  {
    title: "Tirzepatide (Mounjaro / Zepbound): The Dual-Action Weight Loss Breakthrough",
    questions: [
      "What's your experience with Tirzepatide, and why did you offer it alongside or instead of Semaglutide?",
      "Explain Tirzepatide's dual GIP/GLP-1 action and why it can mean greater weight loss, in beginner terms.",
      "Share a case study of a patient who switched from Semaglutide to Tirzepatide or started on it directly.",
      "Your honest take on Tirzepatide vs. Semaglutide: when do you recommend one over the other, and the biggest misconception?",
      "Practical side: dosing tiers, cost/what's included, ideal candidate, side effect management, and your call-to-action.",
    ],
  },
  {
    title: "Retatrutide: The Next-Generation Triple-Agonist for Weight Loss",
    questions: [
      "How did Beyond Stem Cells come to offer Retatrutide, and your perspective on being an early adopter?",
      "What makes Retatrutide a 'triple agonist,' how does it differ from Semaglutide and Tirzepatide, and what does early evidence suggest?",
      "Any early patient experience or clinical observations with Retatrutide you can share?",
      "Your honest opinion on where Retatrutide fits today given it's newer, who it's best for, and your cautions?",
      "Practical: dosing and monitoring, cost/what's included, candidacy, safety, and call-to-action.",
    ],
  },
  {
    title: "BPC-157: The Healing Peptide for Inflammation, Injury, and Gut Health",
    questions: [
      "What is your clinic's experience with BPC-157, and how did you come to use it for injury recovery and GI issues?",
      "In simple terms, what is BPC-157, how is it thought to work for inflammation, muscle recovery, and gut healing, and what conditions do you use it for most?",
      "Tell me about a patient who used BPC-157 for an injury or GI issue: their situation and outcome.",
      "Your honest take on BPC-157: what it realistically does vs. the online hype, and mistakes people make.",
      "Practical: administration (injection, oral, dosing), cost/what's included, candidacy, safety/legal notes, and call-to-action.",
    ],
  },
  {
    title: "TB-500: Accelerating Muscle Recovery and Reducing Inflammation",
    questions: [
      "What's your experience using TB-500, and what kinds of cases do you reach for it in?",
      "How does TB-500 support tissue repair, flexibility, and inflammation, and how is it different from BPC-157?",
      "Share a recovery story from a patient who used TB-500, ideally an athlete or stubborn injury.",
      "Your honest opinion on TB-500: best used alone or stacked with BPC-157, and any cautions?",
      "Practical: dosing protocol, cost/what's included, candidacy, safety, and the call-to-action.",
    ],
  },
  {
    title: "CJC-1295: Boosting Growth Hormone for Muscle and Recovery",
    questions: [
      "What's your clinic's experience with CJC-1295, and what goals do patients come to you with?",
      "How does CJC-1295 stimulate natural HGH release, and what does that mean for muscle, recovery, and vitality?",
      "Tell me about a patient who used CJC-1295 (alone or with Ipamorelin) and their results.",
      "Your honest take on GH-releasing peptides vs. prescription HGH, and realistic timelines?",
      "Practical: dosing, why it's paired with Ipamorelin, cost/what's included, candidacy, safety, and call-to-action.",
    ],
  },
  {
    title: "Ipamorelin: Lean Muscle, Fat Loss, and Anti-Inflammatory Benefits",
    questions: [
      "What's your experience with Ipamorelin, and why is it one of your go-to peptides?",
      "How does Ipamorelin work, and why is it considered a cleaner/more targeted GH secretagogue?",
      "Share a patient example of someone who used Ipamorelin for body composition or recovery.",
      "Your honest opinion on Ipamorelin, the CJC-1295 + Ipamorelin combo, and who benefits most?",
      "Practical: dosing and timing, cost/what's included, candidacy, side effects, and call-to-action.",
    ],
  },
  {
    title: "Sermorelin: Natural Growth Hormone Support for Anti-Aging and Body Composition",
    questions: [
      "What's your experience with Sermorelin, and which patients do you typically recommend it to?",
      "How does Sermorelin stimulate the body's own growth hormone, and what benefits can patients realistically expect?",
      "Tell me about a patient who used Sermorelin and what changed over time.",
      "Your honest take on Sermorelin vs. other GHRH peptides like CJC-1295 and Tesamorelin?",
      "Practical: dosing schedule, cost/what's included, candidacy, safety, and call-to-action.",
    ],
  },
  {
    title: "Tesamorelin: Targeted Fat Loss and Growth Hormone Optimization",
    questions: [
      "What's your experience with Tesamorelin, and what makes it stand out among GH-releasing peptides?",
      "How does Tesamorelin work, and why is it known for reducing stubborn visceral/abdominal fat?",
      "Share a patient story involving Tesamorelin and the results.",
      "Your honest opinion on Tesamorelin, when you choose it over Sermorelin or Ipamorelin, and cautions?",
      "Practical: dosing, cost/what's included, ideal candidate, safety, and your call-to-action.",
    ],
  },
  {
    title: "GHK-Cu: The Copper Peptide for Skin, Hair, and Anti-Aging",
    questions: [
      "What's your experience with GHK-Cu, and how did it become part of your anti-aging offerings?",
      "How does GHK-Cu stimulate collagen and elastin, promote wound healing, reduce inflammation, and support hair growth?",
      "Tell me about a patient who used GHK-Cu for skin, hair, or healing and their results.",
      "Your honest take on GHK-Cu vs. topical skincare or other anti-aging treatments, and what's realistic?",
      "Practical: injectable vs. topical, dosing, cost/what's included, candidacy, safety, and call-to-action.",
    ],
  },
  {
    title: "GLOW Peptide Blend (BPC-157 + TB-500 + GHK-Cu): Total Healing and Rejuvenation",
    questions: [
      "What's your experience with the GLOW blend, and why did you combine these three peptides?",
      "How do BPC-157, TB-500, and GHK-Cu work together in GLOW, and what combined benefits do patients get?",
      "Share a patient success story using GLOW, ideally targeting both healing and skin/anti-aging.",
      "Your honest opinion on combination blends like GLOW vs. single peptides, and who it's ideal for?",
      "Practical: dosing, cost/what's included, candidacy, safety, and the call-to-action.",
    ],
  },
  {
    title: "KLOW Peptide Blend (BPC-157 + TB-500 + GHK-Cu + KPV): Advanced Healing and Anti-Inflammatory Support",
    questions: [
      "What's your experience with the KLOW blend, and what does adding KPV bring that GLOW doesn't?",
      "How does KLOW work, and specifically how does KPV enhance the anti-inflammatory and gut-healing effects?",
      "Tell me about a patient who used KLOW and their results.",
      "Your honest take on when you'd recommend KLOW over GLOW, and who benefits from the added KPV?",
      "Practical: dosing, cost/what's included, candidacy, safety, and your call-to-action.",
    ],
  },
  {
    title: "AOD-9604: The Fat-Burning Fragment of Human Growth Hormone",
    questions: [
      "What's your experience with AOD-9604, and what patient goals lead you to recommend it?",
      "What is AOD-9604, how is it derived from the HGH molecule, and how is it thought to promote fat loss without full GH effects?",
      "Share a patient example of someone who used AOD-9604 for weight or fat loss.",
      "Your honest opinion on AOD-9604, realistic expectations, and how it compares to GLP-1 medications?",
      "Practical: dosing, cost/what's included, candidacy, combining with other therapies, safety, and call-to-action.",
    ],
  },
  {
    title: "Epitalon: The Longevity Peptide for Sleep, Immunity, and Healthy Aging",
    questions: [
      "What's your experience with Epitalon, and how did it become part of your longevity offerings?",
      "How does Epitalon work (including its telomere connection), and what benefits (longevity, sleep, immunity, skin/vision) can patients expect?",
      "Tell me about a patient who used Epitalon and the changes they reported.",
      "Your honest take on longevity peptides like Epitalon, what the science does and doesn't show, and who it's right for?",
      "Practical: how it's cycled/dosed, cost/what's included, candidacy, safety, and your call-to-action.",
    ],
  },
  {
    title: "The Wolverine Peptide Protocol: Healing Tendons, Muscle, Bone, Gut, and Brain",
    questions: [
      "What's your experience with the Wolverine protocol, and where did the name and concept come from in your practice?",
      "What's in the Wolverine protocol and how do the components work together to support tendon, muscle, bone, gut, and brain healing?",
      "Share a patient story, especially someone with multiple injuries or a tough recovery, who used the Wolverine protocol.",
      "Your honest opinion on the Wolverine stack vs. single peptides, and who is the ideal candidate?",
      "Practical: dosing/duration, cost/what's included, candidacy, safety, and the call-to-action.",
    ],
  },
];

const STORAGE_KEY = "jem-bsc-answers-v1";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const setAnswer = (topicTitle: string, qIndex: number, value: string) => {
    setAnswers((prev) => {
      const arr = prev[topicTitle] ? [...prev[topicTitle]] : [];
      arr[qIndex] = value;
      return { ...prev, [topicTitle]: arr };
    });
  };

  const isTopicComplete = (t: Topic) => {
    const a = answers[t.title];
    return a && a.length === t.questions.length && a.every((x) => x && x.trim().length > 0);
  };

  const completedCount = TOPICS.filter(isTopicComplete).length;

  const buildTopicText = (t: Topic) => {
    const a = answers[t.title] || [];
    let out = `TOPIC: ${t.title}\n\n`;
    t.questions.forEach((q, i) => {
      out += `Q${i + 1}: ${q}\nA${i + 1}: ${a[i] ? a[i].trim() : "(no answer yet)"}\n\n`;
    });
    return out;
  };

  const copyTopic = async (t: Topic) => {
    await navigator.clipboard.writeText(buildTopicText(t));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadTopic = (t: Topic) => {
    const blob = new Blob([buildTopicText(t)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safe = t.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 60);
    link.href = url;
    link.download = `${safe}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    let out = "BEYOND STEM CELLS — BLOG INTERVIEW ANSWERS\n(Collected via Jagged Edge Marketing)\n\n========================================\n\n";
    TOPICS.forEach((t) => {
      out += buildTopicText(t) + "----------------------------------------\n\n";
    });
    const blob = new Blob([out], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "beyond-stem-cells-all-answers.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const active = activeIndex !== null ? TOPICS[activeIndex] : null;

  return (
    <main style={S.page}>
      <header style={S.header}>
        <div style={S.brandRow}>
          <span style={S.bolt}>⚡</span>
          <div>
            <div style={S.brandName}>JAGGED EDGE</div>
            <div style={S.brandSub}>M A R K E T I N G</div>
          </div>
        </div>
        <div style={S.headerTag}>Blog Interview Portal · Beyond Stem Cells</div>
      </header>

      <div style={S.intro}>
        <h1 style={S.h1}>Welcome, John 👋</h1>
        <p style={S.introP}>
          Pick a blog topic below and answer the 5 questions in your own words — talk like you would
          to a patient. The more detail and real stories you give, the better and more unique your blog
          posts will be. Your answers save automatically in this browser. When you finish a topic, hit{" "}
          <strong>Copy</strong> or <strong>Download</strong> and send it back to us.
        </p>
        <div style={S.progressWrap}>
          <div style={S.progressBarOuter}>
            <div style={{ ...S.progressBarInner, width: `${(completedCount / TOPICS.length) * 100}%` }} />
          </div>
          <span style={S.progressText}>
            {completedCount} of {TOPICS.length} topics complete
          </span>
        </div>
        <button style={S.downloadAllBtn} onClick={downloadAll}>
          ⬇ Download ALL answers
        </button>
      </div>

      {active === null ? (
        <div style={S.grid}>
          {TOPICS.map((t, i) => (
            <button key={t.title} style={S.card} onClick={() => setActiveIndex(i)}>
              <div style={S.cardTop}>
                <span style={S.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                {isTopicComplete(t) && <span style={S.doneBadge}>✓ Done</span>}
              </div>
              <div style={S.cardTitle}>{t.title}</div>
              <div style={S.cardCta}>Answer questions →</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={S.detail}>
          <button style={S.backBtn} onClick={() => setActiveIndex(null)}>
            ← Back to all topics
          </button>
          <h2 style={S.detailTitle}>{active.title}</h2>

          {active.questions.map((q, i) => (
            <div key={i} style={S.qBlock}>
              <label style={S.qLabel}>
                <span style={S.qNum}>Q{i + 1}</span> {q}
              </label>
              <textarea
                style={S.textarea}
                placeholder="Type your answer here..."
                value={answers[active.title]?.[i] || ""}
                onChange={(e) => setAnswer(active.title, i, e.target.value)}
                rows={5}
              />
            </div>
          ))}

          <div style={S.actionRow}>
            <button style={S.copyBtn} onClick={() => copyTopic(active)}>
              {copied ? "✓ Copied!" : "📋 Copy this topic"}
            </button>
            <button style={S.dlBtn} onClick={() => downloadTopic(active)}>
              ⬇ Download this topic
            </button>
            <button style={S.backBtn2} onClick={() => setActiveIndex(null)}>
              Save & go back
            </button>
          </div>
        </div>
      )}

      <footer style={S.footer}>
        Built by Jagged Edge Marketing · Your answers are stored only in your browser.
      </footer>
    </main>
  );
}

const RED = "#e02b20";
const BLACK = "#0c0c0d";
const CARD = "#161618";

const S: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: BLACK, color: "#f2f2f2", fontFamily: "Inter, system-ui, Arial, sans-serif", padding: "0 0 60px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderBottom: `2px solid ${RED}`, flexWrap: "wrap", gap: 12 },
  brandRow: { display: "flex", alignItems: "center", gap: 12 },
  bolt: { color: RED, fontSize: 34, lineHeight: 1 },
  brandName: { fontWeight: 800, fontSize: 22, letterSpacing: 1, fontStyle: "italic" },
  brandSub: { fontSize: 10, letterSpacing: 6, color: "#bbb" },
  headerTag: { color: "#999", fontSize: 13 },
  intro: { maxWidth: 880, margin: "0 auto", padding: "36px 24px 10px" },
  h1: { fontSize: 28, margin: "0 0 10px" },
  introP: { color: "#c9c9c9", lineHeight: 1.7, fontSize: 16 },
  progressWrap: { display: "flex", alignItems: "center", gap: 14, margin: "22px 0 14px" },
  progressBarOuter: { flex: 1, height: 12, background: "#2a2a2d", borderRadius: 99, overflow: "hidden" },
  progressBarInner: { height: "100%", background: RED, transition: "width .3s" },
  progressText: { fontSize: 13, color: "#bbb", whiteSpace: "nowrap" },
  downloadAllBtn: { background: "transparent", color: RED, border: `1px solid ${RED}`, padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 },
  grid: { maxWidth: 880, margin: "20px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 },
  card: { textAlign: "left", background: CARD, border: "1px solid #2a2a2d", borderRadius: 14, padding: 18, cursor: "pointer", color: "#f2f2f2", display: "flex", flexDirection: "column", gap: 10, minHeight: 150 },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardNum: { color: RED, fontWeight: 800, fontSize: 18, fontStyle: "italic" },
  doneBadge: { fontSize: 12, color: "#1bbf6b", border: "1px solid #1bbf6b", borderRadius: 99, padding: "2px 8px" },
  cardTitle: { fontWeight: 600, fontSize: 15, lineHeight: 1.4, flex: 1 },
  cardCta: { color: RED, fontSize: 13, fontWeight: 600 },
  detail: { maxWidth: 820, margin: "10px auto 0", padding: "0 24px" },
  backBtn: { background: "transparent", color: "#bbb", border: "none", cursor: "pointer", fontSize: 14, padding: "8px 0", marginBottom: 8 },
  backBtn2: { background: "transparent", color: "#bbb", border: "1px solid #444", cursor: "pointer", fontSize: 14, padding: "10px 16px", borderRadius: 8 },
  detailTitle: { fontSize: 22, lineHeight: 1.3, margin: "6px 0 22px", color: "#fff" },
  qBlock: { marginBottom: 22 },
  qLabel: { display: "block", fontSize: 15, color: "#e6e6e6", lineHeight: 1.6, marginBottom: 8 },
  qNum: { color: RED, fontWeight: 800, marginRight: 6 },
  textarea: { width: "100%", background: "#1c1c1f", color: "#fff", border: "1px solid #333", borderRadius: 10, padding: 12, fontSize: 15, lineHeight: 1.6, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" },
  actionRow: { display: "flex", gap: 12, flexWrap: "wrap", margin: "10px 0 40px" },
  copyBtn: { background: RED, color: "#fff", border: "none", padding: "11px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14 },
  dlBtn: { background: "#fff", color: BLACK, border: "none", padding: "11px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14 },
  footer: { textAlign: "center", color: "#777", fontSize: 12, marginTop: 40, padding: "0 24px" },
};
