export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--cinema-border)] bg-[var(--cinema-black)] py-6 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p
          className="text-xs opacity-20"
          style={{ fontWeight: 300, color: "var(--cinema-muted)" }}
        >
          © {currentYear} Sanket Bhor
        </p>
      </div>
    </footer>
  );
}