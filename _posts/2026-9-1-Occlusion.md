---
title: "Occlusion: a hybrid-retrieval dental RAG assistant"
date: 2026-09-01 10:00:00 +0000
categories: [Projects, RAG]
tags: [langgraph, qdrant, ragas, healthcare-safety, python]
image:
  path: /assets/img/posts/occlusion.jpeg
  alt: Dental Theme img
description: "A dental FAQ assistant over 15 openly licensed documents: hybrid dense-plus-sparse retrieval with reciprocal-rank fusion, pre-LLM guardrails, and evals with the misses published alongside the wins."
---

## What I built

Dental front desks miss 20-35% of incoming calls during business hours, and 45% of calls arrive when nobody is answering at all.
Occlusion is my attempt at the routine slice of that problem: a question-answering system over 15 openly licensed dental patient-education documents. It answers with verifiable citations, or refuses safely instead of guessing.
Underneath: hybrid dense-plus-sparse retrieval fused with reciprocal rank fusion, a deterministic guardrail that refuses before the model is ever called, and citation checks that fail closed.

## The problem

The numbers come from industry data on dental front-desk operations, recorded in the project's scope doc before any code was written: staff spend an estimated 50-60% of work hours on phone calls, handling 40-60 calls a day at 4-6 minutes each, while 67% of patients still prefer phone over FAQ pages for anything beyond simple scheduling.

A static FAQ page covers the easy half: fixed phrasing, single-topic questions.
It breaks on the rest: paraphrased questions, multi-part asks ("can I take ibuprofen after the extraction AND is the swelling normal"), and it produces no citation trail a patient or practice can audit.
That gap is why the project needs retrieval machinery at all: natural phrasing in, auditable grounded answer out.

The corpus is deliberately small and fully licensed: 4 US public-domain PDFs (HRSA brushing/flossing, dry mouth, routine care; NIDCR older adults) plus 11 HTML pages (NIDCR gum disease, CDC cavities, 9 NHS UK pages covering wisdom teeth, root canals, abscesses, knocked-out teeth, and post-procedure care).
NHS material carries an Open Government Licence v3.0 attribution on every derived output, and the NHS sourcing means triage answers reflect UK service navigation (111/999/A&E). That is a documented limitation for a likely-US audience, not a silently localized guess.

## Why the obvious fix falls short

Early on, before any guardrail existed, someone asked the system what dosage of amoxicillin to take for a toothache. It answered, confidently, at 0.95 confidence, on a question no patient-education document should ever answer. That incident is why the guardrail now sits before the LLM is ever called.

The obvious fix is a dense-embeddings retriever plus an LLM told to "cite sources."
That gets you two failure modes.

First, dense embeddings miss exact terminology: drug names, procedure codes, specific condition names that dental documents are full of. That is why the project pairs dense retrieval with a sparse BM25-style path rather than trusting either alone.

Second, asking a model to "cite sources" without a mechanism produces citation-shaped hallucination: plausible-looking references to documents that were never retrieved. The project treats this as a mechanical problem, not a prompting wish.

## Refuse fast, verify everything

The pipeline, as-built on main:

```text
User question
  |
Deterministic guardrail (regex, no LLM) — flagged? --> Refusal(out_of_scope), LLM never called
  | allowed
Hybrid retrieval (Qdrant dense top_k 20 + sparse top_k 20, server RRF, client rrf_fuse fallback, top_n 5)
  |
RAG generation (LLM with_structured_output(Answer) -> { answer, citations, confidence })
  |
Validation gates (deterministic code):
  Gate 1 empty retrieval / Gate 2 citation IDs in retrieved set / Gate 3 confidence >= threshold
  |-- fail --> Refusal (fresh object every run, reason enum, "consult a dentist" message)
  |-- pass --> Answer + source links --> END
```

**Hybrid-ready Qdrant from day one, fused by rank.**
Dense (`all-MiniLM-L6-v2`, paraphrase) and sparse (`Splade_PP_en_v1`, exact terminology) vectors are declared together at collection creation, because Qdrant cannot add sparse vectors later without a rebuild (a constraint recorded in the project's architecture decision record).
Fusion is reciprocal rank fusion (k=60, server-side with a client-side fallback) precisely because cosine scores are bounded and BM25 scores are unbounded: you fuse ranks, not scores.
The fusion contract is pinned by test: a document appearing in both lists outranks one ranked first in only one.

**A pre-LLM guardrail with decision-shaped rules.**
The entry node screens every question with deterministic pattern matching before any token is spent: dosage and medication frames, "do I have" diagnosis phrasings, "should I get this treatment" decisions.
Informational mentions of pain, antibiotics, or root canals still pass. The 29 guardrail tests include boundary cases specifically to prevent over-refusal.
Flagged questions refuse in ~0.1s with the LLM never invoked.
I chose regex over an LLM classifier for one reason: latency with zero token spend. A classifier call would put a model round-trip on every question including the refusals; the regex gate answers the safety question before any inference happens. Determinism is a side benefit (the rules are pinned by tests), but speed was the decider.

**Fail-closed validation gates with structured refusals.**
After generation, three deterministic gates check the result: non-empty retrieval, every cited ID present in the retrieved set for that query, confidence above threshold.
Any failure produces a fresh structured refusal. Guardrail-flagged maps to `out_of_scope`, failed validation or empty retrieval maps to `insufficient_context`, and every refusal message tells the reader to consult a dentist.
Zero citations or one fabricated ID is enough to fail.

## Trade-offs

The published numbers include the misses, which is the part I would keep if I rewrote this post from scratch.

Ragas baseline (generator Haiku 4.5 at temp 0, distinct Sonnet judge so the model never grades itself; 68 golden-set items scored): faithfulness ~0.93, relevancy ~0.89, precision ~0.80, recall ~0.92, against targets of 0.85 / 0.80 / 0.75 / measured.
Treat these as approximate: evals ran on a frozen 120-chunk snapshot while the live demo index has since grown to a 179-point superset, so demo parity isn't exact. The figures stand until the harness is re-run on the larger index.
The safety trilogy (frozen doubles, exact-match verifiers): 204/204 oracle criteria across trap refusal, boundary precision, and near-miss minimal pairs.
The live-model pass through real retrieval: 192/202, with all 44 refusal-side items passing and 10 boundary items over-refusing (5 no-citation, 5 low-confidence). That over-refusal is the current calibration backlog, recorded, not averaged away.

Latency missed its original target and the target moved openly: P50 3.5s / P95 4.9s over 12 local calls against a P95 < 3s goal, with the Bedrock round-trip identified as the driver rather than retrieval, and the owner accepting ~5s as the v1 target on 2026-09-19.
Cost is ~$0.01 per query (~$5/day at 500 queries).

Deliberately cut for v1: diagnosis, any patient records or PHI (the corpus is 100% public education material, sidestepping HIPAA by construction), booking, insurance terminology (no clearly-licensed dental glossary exists, so "what's a deductible" refuses as out-of-corpus), voice, fine-tuning, and multilingual support.
Generation runs on Bedrock (Haiku 4.5) as the single wired path. Its answer quality on this task beat the Groq-hosted options I tried, so the choice stuck.
Chunking is RecursiveCharacterTextSplitter at 1000/200, picked from the plan's "few hundred tokens" guidance and spot-checked by reading samples, not by a formal sweep. Honest default, not a measured optimum.
Cross-encoder reranking was built as a toggle, measured, and left off. "We measured, it didn't earn its latency" is documented as an acceptable outcome.

The hard gate stands: any trap question answered confidently instead of refused means do not ship, no matter how good everything else looks.
Six dangerous trap questions refuse live on the public demo without the model ever being asked.
That is the whole thesis in one behavior: cited answers or safe refusal, measured, not claimed.
