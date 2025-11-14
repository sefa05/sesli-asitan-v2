"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Modal from "../../../components/Modal";
import RandevuForm from "./components/RandevuForm";

type Randevu = {
  id: string;
  hasta_adi: string;
  telefon: string;
  notlar?: string | null;
  tarih_saat: string;
  durum: string;
};

export default function RandevularPage() {
  const [randevular, setRandevular] = useState<Randevu[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tümü");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Randevu | null>(null);

  useEffect(() => {
    fetchRandevular();
  }, []);

  async function fetchRandevular() {
    setLoading(true);
    let query: any = supabase.from("randevular").select("*").order("tarih_saat", { ascending: true });
    if (filterStatus !== "Tümü") {
      query = query.eq("durum", filterStatus.toLowerCase());
    }
    if (dateFilter) {
      const start = new Date(dateFilter);
      start.setHours(0,0,0,0);
      const end = new Date(dateFilter);
      end.setHours(23,59,59,999);
      query = query.gte("tarih_saat", start.toISOString()).lte("tarih_saat", end.toISOString());
    }
    const { data } = await query;
    setRandevular((data as any) ?? []);
    setLoading(false);
  }

  function openNew() {
    setEditing(null);
    setOpenForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return;
    await supabase.from("randevular").delete().eq("id", id);
    fetchRandevular();
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <label>Tarih:</label>
            <input type="date" value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)} className="border rounded p-1" />
            <label>Durum:</label>
            <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)} className="border rounded p-1">
              <option>Tümü</option>
              <option>Beklemede</option>
              <option>Onayli</option>
              <option>Iptal</option>
            </select>
            <button className="bg-gray-200 px-3 py-1 rounded" onClick={fetchRandevular}>Filtrele</button>
          </div>
          <div>
            <button onClick={openNew} className="bg-blue-600 text-white px-3 py-1 rounded">Yeni Randevu Ekle</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        {loading ? <div>Yükleniyor...</div> :
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Hasta Adı</th>
              <th>Telefon</th>
              <th>Tarih & Saat</th>
              <th>Durum</th>
              <th>Notlar</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {randevular.map(r => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-2">{r.hasta_adi}</td>
                <td>{r.telefon}</td>
                <td>{new Date(r.tarih_saat).toLocaleString("tr-TR")}</td>
                <td>{r.durum}</td>
                <td>{r.notlar}</td>
                <td>
                  <button onClick={()=>{ setEditing(r); setOpenForm(true); }} className="text-blue-600 mr-2">Düzenle</button>
                  <button onClick={()=>handleDelete(r.id)} className="text-red-600">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      <Modal open={openForm} onClose={()=>setOpenForm(false)}>
        <RandevuForm
          initial={editing}
          onSaved={() => { setOpenForm(false); fetchRandevular(); }}
          onCancel={() => setOpenForm(false)}
        />
      </Modal>
    </div>
  );
}
