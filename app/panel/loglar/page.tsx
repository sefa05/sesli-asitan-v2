"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Log = {
  id: string;
  tip: string;
  mesaj: string;
  tarih_saat: string;
};

export default function LoglarPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    const { data } = await supabase.from("loglar").select("*").order("tarih_saat", { ascending: false }).limit(200);
    setLogs((data as any) ?? []);
    setLoading(false);
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold">Loglar</h2>
        <p className="text-sm text-gray-600">Sesli asistan ve panel aktiviteleri burada görünür.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        {loading ? <div>Yükleniyor...</div> :
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Tarih & Saat</th>
              <th>Tip</th>
              <th>Mesaj</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-b last:border-b-0">
                <td className="py-2">{new Date(l.tarih_saat).toLocaleString("tr-TR")}</td>
                <td>{l.tip}</td>
                <td>{l.mesaj}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
}
