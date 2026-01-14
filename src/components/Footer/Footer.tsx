export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>© {currentYear}</span>
          <span>•</span>
          <span>Created by</span>
          <a
            href="https://github.com/tcweeei"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            tcweeei
          </a>
        </div>
      </div>
    </footer>
  );
}
