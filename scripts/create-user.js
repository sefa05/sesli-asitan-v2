require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Lütfen .env.local içinde NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlayın.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
  const email = 'admin@camlica.test';
  const password = 'Test1234!';

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (error) {
      console.error('Kullanıcı oluşturma hatası:', error);
      process.exit(1);
    }
    console.log('Kullanıcı oluşturuldu:', data);
    console.log(`Giriş için: E-posta: ${email}  Şifre: ${password}`);
  } catch (err) {
    console.error('Beklenmeyen hata:', err.message || err);
    process.exit(1);
  }
}

createAdmin();
