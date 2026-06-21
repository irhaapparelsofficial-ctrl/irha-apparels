import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper functions
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  if (error) throw error;
  return data;
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
}

export async function createOrder(userId, items, totalAmount) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        total_amount: totalAmount,
        status: 'pending',
      },
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
