import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiffViewer } from "../src/react/DiffViewer";
import { DiffChars } from "../src/react/DiffChars";
import { DiffCharsRaw } from "../src/react/DiffCharsRaw";
import { DiffStats } from "../src/react/DiffStats";

// ── DiffStats ─────────────────────────────────────────────────────────────────

describe("DiffStats", () => {
  it("renders added count", () => {
    const { container } = render(<DiffStats before="hello" after="hello\nworld" />);
    expect(container.textContent).toContain("+1 added");
  });

  it("renders removed count", () => {
    const { container } = render(<DiffStats before="hello\nworld" after="hello" />);
    expect(container.textContent).toContain("−1 removed");
  });

  it("renders unchanged count", () => {
    const { container } = render(<DiffStats before="hello\nworld" after="hello\nearth" />);
    expect(container.textContent).toContain("0 unchanged");
  });

  it("renders zero counts for identical strings", () => {
    const { container } = render(<DiffStats before="hello" after="hello" />);
    expect(container.textContent).toContain("+0 added");
    expect(container.textContent).toContain("−0 removed");
  });

  it("applies custom className", () => {
    const { container } = render(
      <DiffStats before="a" after="b" className="custom-stats" />
    );
    expect(container.firstChild).toHaveClass("custom-stats");
  });

  it("applies custom style", () => {
    const { container } = render(
      <DiffStats before="a" after="b" style={{ fontSize: "1rem" }} />
    );
    expect((container.firstChild as HTMLElement).style.fontSize).toBe("1rem");
  });
});

// ── DiffViewer ────────────────────────────────────────────────────────────────

describe("DiffViewer", () => {
  it("renders without crashing", () => {
    const { container } = render(<DiffViewer before="hello" after="world" />);
    expect(container).toBeTruthy();
  });

  it("shows stats bar by default", () => {
    const { container } = render(<DiffViewer before="hello" after="world" />);
    expect(container.textContent).toContain("added");
    expect(container.textContent).toContain("removed");
  });

  it("hides stats bar when showStats=false", () => {
    const { container } = render(
      <DiffViewer before="hello" after="world" showStats={false} />
    );
    expect(container.textContent).not.toContain("added");
  });

  it("renders + prefix for added lines", () => {
    const { container } = render(
      <DiffViewer before="hello" after="hello\nworld" context={0} />
    );
    expect(container.textContent).toContain("+");
  });

  it("renders − prefix for removed lines", () => {
    const { container } = render(
      <DiffViewer before="hello\nworld" after="hello" context={0} />
    );
    expect(container.textContent).toContain("−");
  });

  it("shows 'no changes' for identical strings", () => {
    const { container } = render(<DiffViewer before="hello" after="hello" />);
    expect(container.textContent).toContain("no changes");
  });

  it("renders chunk separator for non-adjacent changes", () => {
    const a = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj";
    const b = "A\nb\nc\nd\ne\nf\ng\nh\ni\nJ";
    const { container } = render(<DiffViewer before={a} after={b} context={1} />);
    expect(container.textContent).toContain("···");
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <DiffViewer before="a" after="b" className="my-viewer" />
    );
    expect(container.firstChild).toHaveClass("my-viewer");
  });

  it("applies classNames prop — skips inline styles", () => {
    const { container } = render(
      <DiffViewer
        before="hello"
        after="world"
        classNames={{ added: "tw-added", removed: "tw-removed", unchanged: "tw-unchanged" }}
      />
    );
    expect(container.innerHTML).toContain("tw-removed");
    expect(container.innerHTML).toContain("tw-added");
  });

  it("respects context prop", () => {
    const a = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    const b = "1\n2\n3\n4\nX\n6\n7\n8\n9\n10";
    const { container: c0 } = render(<DiffViewer before={a} after={b} context={0} />);
    const { container: c3 } = render(<DiffViewer before={a} after={b} context={3} />);
    expect(c3.textContent!.length).toBeGreaterThan(c0.textContent!.length);
  });
});

// ── DiffChars ─────────────────────────────────────────────────────────────────

describe("DiffChars", () => {
  it("renders without crashing", () => {
    const { container } = render(<DiffChars before="prod" after="staging" />);
    expect(container).toBeTruthy();
  });

  it("renders all characters from both strings", () => {
    const { container } = render(<DiffChars before="ab" after="ac" />);
    const text = container.textContent;
    expect(text).toContain("a");
    expect(text).toContain("b");
    expect(text).toContain("c");
  });

  it("renders as inline span", () => {
    const { container } = render(<DiffChars before="a" after="b" />);
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("applies custom className", () => {
    const { container } = render(
      <DiffChars before="a" after="b" className="char-diff" />
    );
    expect(container.firstChild).toHaveClass("char-diff");
  });

  it("applies classNames for added/removed/unchanged", () => {
    const { container } = render(
      <DiffChars
        before="prod"
        after="staging"
        classNames={{ added: "tw-add", removed: "tw-rem", unchanged: "tw-unc" }}
      />
    );
    expect(container.innerHTML).toContain("tw-add");
    expect(container.innerHTML).toContain("tw-rem");
  });

  it("renders identical strings with all unchanged spans", () => {
    const { container } = render(<DiffChars before="hello" after="hello" />);
    const spans = container.querySelectorAll("span span");
    expect(spans.length).toBe(5);
  });

  it("uses nbsp for space characters", () => {
    const { container } = render(<DiffChars before="a b" after="a b" />);
    expect(container.textContent).toContain("\u00a0");
  });
});

// ── DiffCharsRaw ──────────────────────────────────────────────────────────────

describe("DiffCharsRaw", () => {
  it("renders without crashing", () => {
    const { container } = render(<DiffCharsRaw before="prod" after="staging" />);
    expect(container).toBeTruthy();
  });

  it("renders one badge per character", () => {
    const { container } = render(<DiffCharsRaw before="ab" after="ac" />);
    // "a" unchanged, "b" removed, "c" added = 3 badges
    const badges = container.querySelectorAll("div > span");
    expect(badges.length).toBe(3);
  });

  it("renders + prefix for added chars", () => {
    const { container } = render(<DiffCharsRaw before="" after="x" />);
    expect(container.textContent).toContain("+x");
  });

  it("renders − prefix for removed chars", () => {
    const { container } = render(<DiffCharsRaw before="x" after="" />);
    expect(container.textContent).toContain("−x");
  });

  it("renders · prefix for unchanged chars", () => {
    const { container } = render(<DiffCharsRaw before="x" after="x" />);
    expect(container.textContent).toContain("·x");
  });

  it("renders ⎵ for space characters", () => {
    const { container } = render(<DiffCharsRaw before="a b" after="a b" />);
    expect(container.textContent).toContain("⎵");
  });

  it("applies classNames prop", () => {
    const { container } = render(
      <DiffCharsRaw
        before="a"
        after="b"
        classNames={{ added: "tw-add", removed: "tw-rem", unchanged: "tw-unc" }}
      />
    );
    expect(container.innerHTML).toContain("tw-rem");
    expect(container.innerHTML).toContain("tw-add");
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <DiffCharsRaw before="a" after="b" className="raw-grid" />
    );
    expect(container.firstChild).toHaveClass("raw-grid");
  });
});
