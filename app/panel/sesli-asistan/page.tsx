"use client";
import { useState } from "react";
import useVoiceAssistant from "../../../lib/useVoiceAssistant";

export default function SesliAsistanPage() {
  const [assistantId, setAssistantId] = useState(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? "");
  const { startVoiceAssistant, stopVoiceAssistant } = useVoiceAssistant();

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold">Sesli Asistan</h2>
        <p className="text-sm text-gray-600">Sesli asistan Vapi aracılığıyla klinik çağrılarını/etkileşimlerini yönetir. Aşağıda entegrasyon için gerekli alanları görebilirsiniz.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="space-y-3">
          <div>
            <label>Vapi Assistant ID</label>
            <input value={assistantId} onChange={(e)=>setAssistantId(e.target.value)} placeholder="NEXT_PUBLIC_VAPI_ASSISTANT_ID" className="w-full border rounded p-2" />
          </div>
          <div>
            <label>API Key</label>
            <input placeholder="API anahtarınızı burada saklamayın (sunucu tarafında). Burada sadece açıklama amaçlı." className="w-full border rounded p-2" />
            <p className="text-xs text-gray-500 mt-1">Gerçek anahtarlar sunucu ortamında (env) tutulmalı. Bu alana gerçek anahtar girilmeyecek.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={async ()=> await startVoiceAssistant()} className="bg-green-600 text-white px-4 py-2 rounded">Sesli Asistanı Başlat</button>
            <button onClick={stopVoiceAssistant} className="bg-gray-200 px-4 py-2 rounded">Durdur</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold">Vapi entegrasyon notları</h3>
        <ul className="list-disc pl-5 mt-2 text-sm">
          <li>Vapi script'i normalde <code>{`<script src="https://cdn.vapi.ai/..." />`}</code> şeklinde sağlanır. Bunu <strong>app/page</strong> veya özel bir client component içinde ekleyin.</li>
          <li>React SDK örneği (örnek, pseudo-code):
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`// Pseudo-kod
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.vapi.ai/widget.js';
  script.onload = () => Vapi.init({ assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID });
  document.body.appendChild(script);
  return () => { document.body.removeChild(script); };
}, []);`}
            </pre>
          </li>
          <li>Gerçek entegrasyonda startVoiceAssistant() içinde Vapi JS SDK çağrısı yapılır. Burada test modu için log oluşturuyoruz.</li>
        </ul>
      </div>
    </div>
  );
}
