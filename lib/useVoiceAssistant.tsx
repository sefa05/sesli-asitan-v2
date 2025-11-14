"use client";
import { supabase } from "./supabaseClient";

export default function useVoiceAssistant() {
  async function startVoiceAssistant() {
    console.log("Sesli asistan başlatılıyor (test modu)");
    await supabase.from("loglar").insert({
      tip: "sesli_asistan",
      mesaj: "Sesli asistan başlatıldı (test modu)."
    });
    alert("Sesli asistan başlatıldı (test modu). Log eklendi.");
  }

  async function stopVoiceAssistant() {
    console.log("Sesli asistan durduruldu (test modu)");
    await supabase.from("loglar").insert({
      tip: "sesli_asistan",
      mesaj: "Sesli asistan durduruldu (test modu)."
    });
    alert("Sesli asistan durduruldu (test modu). Log eklendi.");
  }

  return { startVoiceAssistant, stopVoiceAssistant };
}
