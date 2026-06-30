export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-4xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">STA Engineering</span>
        <span>© {new Date().getFullYear()} STA Engineering. All rights reserved.</span>
      </div>
    </footer>
  );
}
