import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { insertUserIfNotExists, getUserById } from '@/lib/db';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token);

    if (error || !user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized or invalid user' }, { status: 401 });
    }

    const body = await req.json();
    const phone = body.phone;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // insert only if not exists
    await insertUserIfNotExists({
      id: user.id,
      email: user.email ?? '',
      phone
    });

    return NextResponse.json({ message: 'User inserted or already exists' });
  } catch (error) {
    console.error('❌ Error in POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const {
      data: { user },
      error
    } = await supabase.auth.getUser(token);

    if (error || !user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized or invalid user' }, { status: 401 });
    }

    // 🔍 Try to get user from users table
    try {
      const userData = await getUserById(user.id);
      return NextResponse.json(userData); // ✅ Already exists
    } catch (err) {
      // ❌ Not in users table, try to insert
      try {
        await insertUserIfNotExists({
          id: user.id,
          email: user.email ?? '',
          phone: user.phone,
        });

        const inserted = await getUserById(user.id);
        return NextResponse.json(inserted);
      } catch (insertErr) {
        console.error('Failed to insert user after not found:', insertErr);
        return NextResponse.json({ error: 'Failed to insert user on sync' }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
