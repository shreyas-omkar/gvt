import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// =================== USERS ===================


export const insertUserIfNotExists = async (user: { id: string; email: string; phone: string | undefined }) => {
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (!existingUser) {
    const { error } = await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      phone: user.phone
    });
    if (error) throw new Error('Failed to insert user: ' + error.message);
  }
};


export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('User not found');

  return data;
};



export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
};

// =================== CONSULTATIONS ===================

export const createConsultation = async (consultation: {
  user_id: string;
  fullname: string;
  consultation_type: string;
  date: string;
  time: string;
  has_paid?: boolean;
  address?: string;
  contact?: string;
  detailed_message?: string;
  status?: string;
}) => {
  const { error } = await supabase.from('consultations').insert([
    {
      ...consultation,
      has_paid: consultation.has_paid ?? false,
      status: consultation.status ?? 'pending'
    }
  ]);

  if (error) throw new Error(error.message);
};

export const getConsultationsByUser = async (user_id: string) => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getAllConsultations = async () => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const updateConsultationStatus = async (id: string, status: string) => {
  const { error } = await supabase
    .from('consultations')
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const markConsultationPaid = async (id: string, has_paid = true) => {
  const { error } = await supabase
    .from('consultations')
    .update({ has_paid })
    .eq('id', id);

  if (error) throw new Error(error.message);
};


// =================== AVAILABILITY (ADMIN TIME SLOTS) ===================

export const getAllAvailability = async () => {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const createAvailabilitySlot = async (date: string, time: string) => {
  const { error } = await supabase
    .from('availability')
    .insert([{ date, time }]);

  if (error) throw new Error(error.message);
};

export const deleteAvailabilitySlot = async (id: string) => {
  const { error } = await supabase
    .from('availability')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const markAvailabilityAsBooked = async (id: string, consultationId: string) => {
  const { error } = await supabase
    .from('availability')
    .update({ is_booked: true, consultation_id: consultationId })
    .eq('id', id);

  if (error) throw new Error(error.message);
};

