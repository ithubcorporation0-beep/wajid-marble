// The thin gold wavy line used to separate the About and Products sections,
// meant to look like a vein running through a slab of marble. It's purely
// decorative and never changes, so it stays a server component.

export default function VeinDivider() {
  return (
    <svg className="vein-divider" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 13 Q150 2 300 14 T600 12 T900 15 T1200 10" />
    </svg>
  );
}
