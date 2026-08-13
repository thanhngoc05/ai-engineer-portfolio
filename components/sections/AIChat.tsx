"use client";

import { Bot, Send, Sparkles, User } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What AI projects has Thanh built?",
  "What technologies does he use?",
  "Tell me about his RAG project.",
  "Is he looking for an internship?",
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "AI Core online. Ask me about Thanh's skills, work, or direction.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageId = useRef(1);

  async function sendMessage(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;

    const userMessage: Message = {
      id: messageId.current++,
      role: "user",
      content: cleanQuestion,
    };
    const assistantId = messageId.current++;

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setLoading(true);

    try {
      // Replace this endpoint with a FastAPI gateway when the real RAG backend is ready.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat response unavailable");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: message.content + chunk }
              : message,
          ),
        );
      }
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? { ...message, content: "The mock AI is temporarily offline. Please try again." }
            : message,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section id="ai-interface" className="content-section ai-chat section-shell" aria-labelledby="ai-title">
      <div className="ai-chat__intro">
        <SectionHeading
          eyebrow="AI Interface"
          title="Ask my AI."
          description="Ask questions about my skills, projects and experience."
        />
        <div id="ai-title" className="sr-only">Ask my AI assistant</div>
        <Reveal className="ai-chat__architecture" delay={0.1}>
          <Sparkles size={17} aria-hidden="true" />
          <span>Next.js</span><i>→</i><span>FastAPI</span><i>→</i><span>RAG</span><i>→</i><span>LLM</span>
        </Reveal>
      </div>

      <Reveal className="chat-window" delay={0.08}>
        <div className="chat-window__header">
          <div>
            <span className="chat-window__pulse" aria-hidden="true" />
            AI CORE ASSISTANT
          </div>
          <span>MOCK / ONLINE</span>
        </div>

        <div className="chat-window__messages" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message chat-message--${message.role}`}>
              <span className="chat-message__avatar" aria-hidden="true">
                {message.role === "assistant" ? <Bot size={17} /> : <User size={17} />}
              </span>
              <p>{message.content || <span className="typing-dots">•••</span>}</p>
            </div>
          ))}
        </div>

        <div className="chat-window__suggestions" aria-label="Suggested questions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} disabled={loading}>
              {suggestion}
            </button>
          ))}
        </div>

        <form className="chat-window__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chat-input">Ask a question</label>
          <input
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Thanh..."
            autoComplete="off"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()} aria-label="Send question">
            <Send size={18} aria-hidden="true" />
          </button>
        </form>
      </Reveal>
    </section>
  );
}
