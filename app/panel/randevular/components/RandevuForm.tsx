"use client";
import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

type Props = {
  initial?: any | null;
  onSaved?: ()=>void;
  onCancel?: ()=>void;
};

export default function RandevuForm({ initial, onSaved, onCancel }: Props) {
  const [hastaAdi, setHastaAdi] = useState(initial?.hasta_adi ?? "");
  const [telefon, setTelefon] = useState(initial?.telefon ?? "");
  const [tarihSaat, setTarihSaat] = useState(initial ? new Date(initial.tarih_saat).toISOString().slice(0,16) : "");
  const [durum, setDurum] = useState(initial?.durum ?? "beklemede");
  const [notlar, setNotlar] = useState(initial?.notlar ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        hasta_adi: hastaAdi,
        telefon,
        tarih_saat: new Date(tarihSaat).toISOString(),
        durum,
        notlar
      };
      if (initial?.id) {
        await supabase.from("randevular").update(payload).eq("id", initial.id);
      } else {
        await supabase.from("randevular").insert(payload);
      }
      onSaved?.();
    } catch (err) {
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <h3 className="text-lg font-semibold">{initial ? "Randevuyu Düzenle" : "Yeni Randevu"}</h3>
      <div>
        <label>Hasta Adı</label>
        <input required value={hastaAdi} onChange={(e)=>setHastaAdi(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div>
        <label>Telefon</label>
        <input required value={telefon} onChange={(e)=>setTelefon(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div>
        <label>Tarih & Saat</label>
        <input required type="datetime-local" value={tarihSaat} onChange={(e)=>setTarihSaat(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div>
        <label>Durum</label>
        <select value={durum} onChange={(e)=>setDurum(e.target.value)} className="w-full border rounded p-2">
          <option value="beklemede">Beklemede</option>
          <option value="onayli">Onaylı</option>
          <option value="iptal">İptal</option>
        </select>
      </div>
      <div>
        <label>Notlar</label>
        <textarea value={notlar} onChange={(e)=>setNotlar(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">Kaydet</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded">Vazgeç</button>
      </div>
    </form>
  );
}
