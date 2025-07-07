import { NextRequest, NextResponse } from 'next/server';
import { createConsultation, getAllConsultations } from '@/lib/db';
import { supabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const {
      user_id,
      consultation_type,
      preferred_date,
      preferred_time,
      address,
      contact,
      detailed_message,
      status,
      has_paid
    } = body;

    if (user.id !== user_id) {
      return NextResponse.json({ error: 'User ID mismatch' }, { status: 403 });
    }

    await createConsultation({
      user_id,
      consultation_type,
      date: preferred_date,
      time: preferred_time,
      address,
      contact,
      detailed_message,
      status,
      has_paid
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('POST /api/consultations error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(_req: NextRequest) {
  try {
    const consultations = await getAllConsultations();
    return NextResponse.json(consultations, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/consultations error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
