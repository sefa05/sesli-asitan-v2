"use client";
import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

type EmployeeFormProps = {
  initial?: {
    id: string;
    name: string;
    phone: string;
    position: string;
  } | null; // Allow null explicitly
  onSaved: () => void;
  onCancel: () => void;
};

export default function EmployeeForm({ initial, onSaved, onCancel }: EmployeeFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [phone, setPhone] = useState(initial?.phone || "");
  const [position, setPosition] = useState(initial?.position || "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (initial) {
      await supabase.from("calisanlar").update({ name, phone, position }).eq("id", initial.id);
    } else {
      await supabase.from("calisanlar").insert({ name, phone, position });
    }

    setSaving(false);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Adı</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Telefon</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Pozisyon</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}