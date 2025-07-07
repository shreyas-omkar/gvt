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

    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch consultations' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('GET /api/dashboard error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
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

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Consultation ID required' }, { status: 400 });
    }

    const { data: consultation, error: fetchError } = await supabase
      .from('consultations')
      .select('user_id, status')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) {
      console.error('Fetch consultation error:', fetchError.message);
      return NextResponse.json({ error: 'Failed to verify consultation' }, { status: 500 });
    }

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    if (consultation.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (consultation.status !== 'pending') {
      return NextResponse.json({ error: 'Only pending consultations can be deleted' }, { status: 403 });
    }

    const { error: deleteError } = await supabase
      .from('consultations')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete error:', deleteError.message);
      return NextResponse.json({ error: 'Failed to delete consultation' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('DELETE /api/dashboard error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
