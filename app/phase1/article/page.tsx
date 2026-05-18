import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LockCard } from "@/components/ui/lock-card";
import { AvatarInitials } from "@/components/ui/avatar-initials";

const PLACEHOLDER_LINES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  "Sunt in culpa qui officia deserunt mollit anim id est laborum. Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit.",
];

const BLURRED_LINES = [
  "Excepteur sint occaecat cupidatat non proident deserunt mollit anim.",
  "Sunt in culpa qui officia consequatur vel illum dolore eu fugiat.",
];

export default function ArticlePage() {
  return (
    <main id="main-content">
    <article style={{ maxWidth: 660, margin: "0 auto", padding: "64px 32px 96px" }}>
      {/* Eyebrow */}
      <p style={{
        fontSize: "var(--fs-12)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color: "var(--blue)",
        margin: "0 0 14px",
      }}>
        Members · Playbook
      </p>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-36)",
        letterSpacing: "var(--tracking-display)",
        lineHeight: "var(--lh-display)",
        margin: "0 0 20px",
        maxWidth: 560,
      }}>
        Scaling recurring revenue past your first 1,000 members
      </h1>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <AvatarInitials name="Maya Nakamura" size="sm" />
        <span style={{ fontSize: "var(--fs-14)", color: "var(--ink-2)" }}>
          Maya Nakamura
        </span>
        <span style={{ color: "var(--hairline)", fontSize: "var(--fs-14)" }}>·</span>
        <span style={{ fontSize: "var(--fs-14)", color: "var(--ink-3)" }}>8 min read</span>
      </div>

      {/* Article body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PLACEHOLDER_LINES.map((text, i) => (
          <p key={i} style={{
            fontSize: "var(--fs-16)",
            lineHeight: "var(--lh-body)",
            color: "var(--ink-2)",
            margin: 0,
          }}>
            {text}
          </p>
        ))}

        {/* Blurred / paywall hint — hidden from AT; LockCard provides the CTA */}
        <div aria-hidden="true" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-sm)" }}>
          {BLURRED_LINES.map((text, i) => (
            <p key={i} style={{
              fontSize: "var(--fs-16)",
              lineHeight: "var(--lh-body)",
              color: "var(--ink-2)",
              margin: "0 0 16px",
              filter: "blur(5px)",
              userSelect: "none",
            }}>
              {text}
            </p>
          ))}
        </div>

        {/* Lock card */}
        <LockCard
          title="Members only"
          description="Continue reading with a Kadence membership"
          action={
            <Button variant="primary" style={{ width: "100%" }}>
              Unlock full article — from $19/mo
            </Button>
          }
        />

        {/* Already a member */}
        <p style={{
          textAlign: "center",
          fontSize: "var(--fs-14)",
          color: "var(--ink-3)",
          margin: 0,
        }}>
          Already a member?{" "}
          <Link
            href="#"
            style={{
              color: "var(--blue)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </article>
    </main>
  );
}
