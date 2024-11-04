import { NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const response = await axios.post(`${API_BASE_URL}/patients/check`, { email });

    return NextResponse.json({ exists: response.data.exists });
  } catch (error) {
    console.error('Patient check error:', error);
    return NextResponse.json(
      { error: 'Failed to check patient' },
      { status: 500 }
    );
  }
}