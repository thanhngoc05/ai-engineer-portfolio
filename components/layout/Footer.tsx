import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Designed as an evolving AI system.</span>
      <a href="#home">Back to core ↑</a>
    </footer>
  );
}

