"use client";

import { useState } from "react";
import { Star, ShoppingCart, RotateCcw, Truck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swatch } from "@/components/ui/swatch";
import { Stepper } from "@/components/ui/stepper";
import { Card } from "@/components/ui/card";

const COLORS = [
  { id: "orange", color: "#E8722A", label: "Sunset Orange" },
  { id: "white",  color: "#F5F3EF", label: "Cream White"   },
  { id: "black",  color: "#1C1C1E", label: "Midnight Black" },
  { id: "slate",  color: "#6B7280", label: "Storm Grey"    },
];

const THUMBNAILS = [
  { id: "1", bg: "#E8722A", label: "Front view" },
  { id: "2", bg: "#D4641E", label: "Side view"  },
  { id: "3", bg: "#C25518", label: "Top view"   },
  { id: "4", bg: "#F0945A", label: "Close-up"   },
];

const FEATURES = [
  { icon: <RotateCcw size={15} />, label: "Free Returns" },
  { icon: <Truck      size={15} />, label: "Free Shipping" },
  { icon: <Headphones size={15} />, label: "24hr Support"  },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars — ${count} reviews`}
      style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 16 }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          size={14}
          style={{
            fill: i < rating ? "var(--amber)" : "none",
            color: i < rating ? "var(--amber)" : "var(--ink-3)",
          }}
        />
      ))}
      <span aria-hidden="true" style={{ fontSize: "var(--fs-13)", color: "var(--ink-3)", marginLeft: 2 }}>
        ({count} reviews)
      </span>
    </div>
  );
}

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState("orange");
  const [activeThumb, setActiveThumb] = useState("1");

  const selectedColor = COLORS.find((c) => c.id === activeColor)!;

  return (
    <main id="main-content" style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 32px 96px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

        {/* ── Left: image gallery ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Main image */}
          <Card style={{
            aspectRatio: "4/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: selectedColor.color,
            position: "relative",
            overflow: "hidden",
            padding: 0,
          }}>
            <Badge
              variant="success"
              style={{ position: "absolute", top: 12, left: 12 }}
            >
              NEW
            </Badge>
            {/* Headphone silhouette placeholder */}
            <div style={{
              width: 180, height: 160,
              borderRadius: "50% 50% 0 0 / 60% 60% 0 0",
              border: "18px solid rgba(255,255,255,0.35)",
              borderBottom: "none",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", bottom: -18, left: -30,
                width: 18, height: 40,
                background: "rgba(255,255,255,0.35)",
                borderRadius: 9,
              }} />
              <div style={{
                position: "absolute", bottom: -18, right: -30,
                width: 18, height: 40,
                background: "rgba(255,255,255,0.35)",
                borderRadius: 9,
              }} />
            </div>
          </Card>

          {/* Thumbnails */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {THUMBNAILS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThumb(t.id)}
                aria-label={t.label}
                style={{
                  aspectRatio: "1",
                  borderRadius: "var(--r-md)",
                  background: t.bg,
                  cursor: "pointer",
                  border: "none",
                  outline: activeThumb === t.id
                    ? "2px solid var(--blue)"
                    : "2px solid transparent",
                  outlineOffset: 2,
                  boxShadow: "var(--elev-2)",
                  transition: "outline-color 120ms ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Right: product info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Title + rating */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-28)",
            letterSpacing: "var(--tracking-display)",
            margin: "0 0 10px",
          }}>
            Wireless Headphones Pro
          </h1>

          <StarRating rating={4} count={128} />

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
            <span style={{
              fontSize: "var(--fs-14)",
              color: "var(--ink-3)",
              textDecoration: "line-through",
            }}>
              $129.99
            </span>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-28)",
              fontWeight: 700,
              color: "var(--ink)",
            }}>
              $89.99
            </span>
            <Badge variant="success">51% OFF</Badge>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "var(--fs-14)",
            lineHeight: "var(--lh-body)",
            color: "var(--ink-2)",
            margin: "0 0 22px",
          }}>
            Premium sound, 30-day comfort. Wireless freedom. Built for focus, made for every moment.
          </p>

          {/* Color picker */}
          <div style={{ marginBottom: 22 }}>
            <div style={{
              fontSize: "var(--fs-13)", fontWeight: 600,
              color: "var(--ink-2)", marginBottom: 10,
            }}>
              Color — <span style={{ fontWeight: 400, color: "var(--ink-3)" }}>{selectedColor.label}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {COLORS.map((c) => (
                <Swatch
                  key={c.id}
                  color={c.color}
                  active={activeColor === c.id}
                  onClick={() => setActiveColor(c.id)}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 22 }}>
            <Stepper value={qty} onChange={setQty} min={1} max={10} />
            <Button variant="orange" style={{ flex: 1 }}>
              <ShoppingCart size={15} /> Add to Cart
            </Button>
          </div>

          {/* Feature pills */}
          <div style={{
            display: "flex", gap: 8,
            padding: "14px 0",
            borderTop: "1px solid var(--hairline)",
          }}>
            {FEATURES.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  flex: 1,
                  fontSize: "var(--fs-12)",
                  fontWeight: 600,
                  color: "var(--ink-3)",
                  justifyContent: "center",
                }}
              >
                {f.icon}
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
