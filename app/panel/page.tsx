"use client";

import Card from "../../components/Card";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PanelPage() {
  const [bugun, setBugun] = useState(0);
  const [onayli, setOnayli] = useState(0);
  const [beklemede, setBeklemede] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayIso = todayStart.toISOString();

      const { data: allToday } = await supabase
        .from("randevular")
        .select("*")
        .gte("tarih_saat", todayIso)
        .limit(100);

      const { data: onay } = await supabase
        .from("randevular")
        .select("*")
        .eq("durum", "onayli");

      const { data: bek } = await supabase
        .from("randevular")
        .select("*")
        .eq("durum", "beklemede");

      setBugun(allToday?.length ?? 0);
      setOnayli(onay?.length ?? 0);
      setBeklemede(bek?.length ?? 0);
    }
    fetchStats();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Bugünkü Randevu Sayısı" value={bugun} />
        <Card title="Onaylı Randevular" value={onayli} />
        <Card title="Bekleyen Randevular" value={beklemede} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Hızlı Erişim</h2>
          <div className="space-x-2">
            <Link
              href="/panel/randevular"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Randevular
            </Link>

            <Link
              href="/panel/sesli-asistan"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Sesli Asistan
            </Link>
          </div>
        </div>

        <p>
          Panel üzerinden randevuları görüntüleyebilir, düzenleyebilir ve Vapi
          sesli asistan ile etkileşim sağlayabilirsiniz.
        </p>
      </div>
    </div>
  );
}
