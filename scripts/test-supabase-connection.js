// dotenv does not load .env.local by default, load .env.local explicitly if present
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Env eksik: NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY yok.');
  process.exit(1);
}

const supabase = createClient(url, key);

(async () => {
  try {
    const { data, error } = await supabase.from('randevular').select('id').limit(1);
    if (error) {
      console.error('Supabase hata:', error);
      process.exit(1);
    }
    console.log('Supabase bağlantı başarılı. Örnek veri:', data);
  } catch (err) {
    console.error('Fetch hatası (network):', err.message || err);
    process.exit(1);
  }
})();
