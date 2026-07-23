import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function seedAdminUser() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Admin credentials
  const adminEmail = 'admin@sapphire.career';
  const adminPassword = 'SapphireAdmin@2024!';

  try {
    // Create admin user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Sapphire Admin',
        role: 'admin',
      },
    });

    if (authError) {
      console.error('Error creating admin user:', authError.message);
      return;
    }

    if (!authData.user) {
      console.error('No user returned from auth');
      return;
    }

    // Create admin_users entry
    const { error: dbError } = await supabase.from('admin_users').insert({
      id: authData.user.id,
      email: adminEmail,
      role: 'admin',
      permissions: ['all'],
    });

    if (dbError) {
      console.error('Error creating admin user record:', dbError.message);
      return;
    }

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  seedAdminUser();
}
