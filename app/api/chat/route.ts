import { NextResponse } from "next/server";

const responses = {
  projects:
    "Thanh is building an AI Document Assistant with RAG, a customer churn prediction system, and this interactive 3D AI portfolio. Each project connects an AI concept to a usable software product.",
  technologies:
    "His current toolkit includes Python, PyTorch, Scikit-learn, FastAPI, PostgreSQL, Docker, TypeScript, Next.js, and Three.js. He is especially focused on LLM applications, RAG, embeddings, and vector search.",
  rag:
    "The AI Document Assistant is designed as a grounded question-answering system. Documents are processed into embeddings, stored in a vector database, retrieved by relevance, and supplied to an LLM through a FastAPI backend.",
  internship:
    "Yes. Thanh is open to AI Engineer and AI Software Engineer internship opportunities where he can contribute, learn from production systems, and strengthen his engineering foundation.",
  default:
    "Thanh is a Computer Science student rebuilding his software engineering foundation with a clear direction toward applied AI. Ask me about his projects, technologies, RAG work, or internship goals.",
} as const;

function selectResponse(message: string) {
  const query = message.toLowerCase();
  if (query.includes("rag") || query.includes("document")) return responses.rag;
  if (query.includes("project") || query.includes("built")) return responses.projects;
  if (query.includes("technolog") || query.includes("skill") || query.includes("use")) {
    return responses.technologies;
  }
  if (query.includes("intern") || query.includes("looking") || query.includes("opportun")) {
    return responses.internship;
  }
  return responses.default;
}

export async function POST(request: Request) {
  let body: { message?: unknown };

  try {
    body = (await request.json()) as { message?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ error: "A message is required" }, { status: 400 });
  }

  const answer = selectResponse(body.message.slice(0, 500));
  const words = answer.split(" ");
  const encoder = new TextEncoder();

  // Future backend connection:
  // Replace this mock stream with a proxy to FastAPI -> RAG -> Vector DB -> LLM.
  // Keep the plain text stream contract so the current frontend does not need to change.
  const stream = new ReadableStream({
    async start(controller) {
      for (const [index, word] of words.entries()) {
        controller.enqueue(encoder.encode(`${index === 0 ? "" : " "}${word}`));
        await new Promise((resolve) => setTimeout(resolve, 24));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

