import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user profile from users table
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle();

    if (userError || !userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    if (userProfile.is_admin) {
      // Admin view: fetch all consultations and availability
      const [consultationsRes, availabilityRes] = await Promise.all([
        supabase
          .from('consultations')
          .select('*, users: user_id(email)')
          .order('created_at', { ascending: false }),

        supabase
          .from('availability')
          .select('*, consultations(*)')
          .order('date', { ascending: true })
      ]);

      console.log(consultationsRes.data, availabilityRes.data)
      if (consultationsRes.error || availabilityRes.error) {
        return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
      }

      return NextResponse.json({
        isAdmin: true,
        consultations: consultationsRes.data,
        availability: availabilityRes.data
      });
    } else {
      // Normal user view: fetch only own consultations
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
      }

      return NextResponse.json({
        isAdmin: false,
        consultations: data
      });
    }
  } catch (err: any) {
    console.error('GET /api/dashboard error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
