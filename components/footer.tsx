export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 relative overflow-hidden mt-12 py-6 snap-start mb-20 sm:mb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <span>Built with</span>
          <span className="text-blue-700 animate-pulse">❤</span>
          <span>by Dipanshu.</span>
        </div>
      </div>
    </footer>
  );
}
