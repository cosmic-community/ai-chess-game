import { NextRequest, NextResponse } from 'next/server';
import { getAIMove } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fen, legalMoves, moveHistory } = body;

    if (!fen || !legalMoves || !Array.isArray(legalMoves)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const move = await getAIMove(fen, legalMoves, moveHistory || []);

    return NextResponse.json({ move });
  } catch (error) {
    console.error('Error in AI move endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI move' },
      { status: 500 }
    );
  }
}