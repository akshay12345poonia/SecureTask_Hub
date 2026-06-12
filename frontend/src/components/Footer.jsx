
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-400">
          Made with ❤️ by <span className="text-blue-400 font-semibold">Akshay Poonia</span>
        </p>
        <p className="text-xs text-slate-500 mt-2">
          RoleGuard Tasker © {new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </footer>
  );
}
