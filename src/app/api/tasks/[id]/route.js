import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

// DELETE: Task delete karne ke liye
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // Yahan await lagana zaroori hai!
    
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}