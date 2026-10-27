from ask import search_documents, answer_question

QUESTIONS = [
    "What does NovaTech do?",
    "Which department owns the product roadmap?",
    "What is the main focus of the Paris office?",
    "What happens before a document revision is visible to ordinary users?",
    "What is NovaTech's employee vacation allowance?",
]

for i, q in enumerate(QUESTIONS, 1):
    print("\n" + "=" * 70)
    print(f"Q{i}: {q}")
    print("=" * 70)
    results = search_documents(q)
    ans = answer_question(q, results)
    print(f"\nAnswer: {ans}\n")
    seen = set()
    for r in results:
        key = (r.get("filename"), r.get("page"))
        if key in seen:
            continue
        seen.add(key)
        print(f"  → {r.get('filename')}, page {r.get('page')} "
              f"(score={r.get('score', 0):.3f})")