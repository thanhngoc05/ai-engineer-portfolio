"use client";

import { Download } from "lucide-react";
import { useState, type ReactNode } from "react";

import { profile } from "@/data/profile";

type ResumeLinkProps = {
  children?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function ResumeLink({
  children = "Download CV",
  className = "button button--secondary",
  compact = false,
}: ResumeLinkProps) {
  const [message, setMessage] = useState("");

  async function handleDownload() {
    try {
      const response = await fetch(profile.resumePath, { method: "HEAD" });

      if (!response.ok) {
        setMessage("CV will be available soon.");
        return;
      }

      const link = document.createElement("a");
      link.href = profile.resumePath;
      link.download = "Nguyen-Ngoc-Thanh-CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setMessage("CV will be available soon.");
    }
  }

  return (
    <span className={`resume-link${compact ? " resume-link--compact" : ""}`}>
      <button type="button" className={className} onClick={handleDownload}>
        {children}
        <Download size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
      {message ? (
        <span className="resume-link__message" role="status">
          {message}
        </span>
      ) : null}
    </span>
  );
}

