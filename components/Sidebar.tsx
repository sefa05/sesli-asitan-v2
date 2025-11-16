"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/giris");
  }

  const items = [
    { href: "/panel", label: "Panel" },
    { href: "/panel/randevular", label: "Randevular" },
    { href: "/panel/sesli-asistan", label: "Sesli Asistan" },
    { href: "/panel/loglar", label: "Loglar" }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm p-4 min-h-screen hidden md:block">
      <div className="mb-6 font-semibold text-lg">Çamlıca Diş Kliniği</div>
      <nav className="space-y-2">
        {items.map((it) => (
          <Link key={it.href} href={it.href}
            className={
              "block p-2 rounded " +
              (pathname === it.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")
            }
          >
            {it.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        <button onClick={signOut} className="w-full bg-red-500 text-white py-2 rounded">Çıkış Yap</button>
      </div>
      <div className="mt-6 text-xs text-gray-500">Sesli Asistan Paneli</div>
    </aside>
  );
}
