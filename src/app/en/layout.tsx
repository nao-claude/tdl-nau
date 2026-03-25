export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override lang attribute for the /en subtree
  // Note: The html element's lang is set in root layout.
  // We use this segment layout to wrap content for the English version.
  return <>{children}</>;
}
