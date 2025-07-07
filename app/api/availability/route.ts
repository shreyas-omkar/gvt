import { NextResponse } from 'next/server';
import {
  getAllAvailability,
  createAvailabilitySlot,
  deleteAvailabilitySlot
} from '@/lib/db';

export async function GET() {
  try {
    const slots = await getAllAvailability();
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { date, time } = await req.json();
    if (!date || !time) throw new Error('Date and time required');
    await createAvailabilitySlot(date, time);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) throw new Error('ID required');
    await deleteAvailabilitySlot(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
