"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Modal from "../../../components/Modal";
import EmployeeForm from "./components/EmployeeForm";

type Employee = {
  id: string;
  name: string;
  phone: string;
  position: string;
};

export const runtime = "nodejs";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    const { data } = await supabase.from("calisanlar").select("*").order("name", { ascending: true });
    setEmployees((data as any) ?? []);
    setLoading(false);
  }

  function openNew() {
    setEditing(null);
    setOpenForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu çalışanı silmek istediğinize emin misiniz?")) return;
    await supabase.from("calisanlar").delete().eq("id", id);
    fetchEmployees();
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Çalışanlar</h1>
          <button onClick={openNew} className="bg-blue-600 text-white px-3 py-1 rounded">Yeni Çalışan Ekle</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        {loading ? <div>Yükleniyor...</div> :
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Adı</th>
              <th>Telefon</th>
              <th>Pozisyon</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b last:border-b-0">
                <td className="py-2">{emp.name}</td>
                <td>{emp.phone}</td>
                <td>{emp.position}</td>
                <td>
                  <button onClick={()=>{ setEditing(emp); setOpenForm(true); }} className="text-blue-600 mr-2">Düzenle</button>
                  <button onClick={()=>handleDelete(emp.id)} className="text-red-600">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      <Modal open={openForm} onClose={()=>setOpenForm(false)}>
        <EmployeeForm
          initial={editing || undefined} // Ensure null is converted to undefined
          onSaved={() => { setOpenForm(false); fetchEmployees(); }}
          onCancel={() => setOpenForm(false)}
        />
      </Modal>
    </div>
  );
}