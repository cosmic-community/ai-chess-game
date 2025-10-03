import { createBucketClient } from '@cosmicjs/sdk';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get AI move from Cosmic AI
export async function getAIMove(
  fen: string,
  legalMoves: string[],
  moveHistory: string[]
): Promise<string> {
  try {
    const prompt = `You are a chess AI playing as Black. Analyze this position and provide the best move.

Current board (FEN): ${fen}
Legal moves available: ${legalMoves.join(', ')}
Recent move history: ${moveHistory.slice(-5).join(', ')}

Important instructions:
1. Respond with ONLY the move in standard chess notation (e.g., "e7e5", "Ng8f6", "e8g8" for castling)
2. Choose from the legal moves list provided
3. Consider tactical and strategic factors
4. Prioritize piece development in the opening
5. Look for tactical opportunities (checks, captures, threats)

Your move:`;

    const response = await cosmic.ai.generateText({
      prompt,
      max_tokens: 50,
    });

    // Extract move from response text
    const moveText = response.text.trim();
    
    // Try to find a valid move in the response
    const moveMatch = moveText.match(/[a-h][1-8][a-h][1-8][qrbn]?/i);
    if (moveMatch) {
      const suggestedMove = moveMatch[0].toLowerCase();
      // Validate the move is in legal moves
      if (legalMoves.includes(suggestedMove)) {
        return suggestedMove;
      }
    }

    // If AI response doesn't contain a valid move, return a random legal move
    console.warn('AI response did not contain a valid move, using random move');
    return legalMoves[Math.floor(Math.random() * legalMoves.length)] || legalMoves[0] || 'e7e5';

  } catch (error) {
    console.error('Error getting AI move:', error);
    // Fallback to random move on error
    return legalMoves[Math.floor(Math.random() * legalMoves.length)] || legalMoves[0] || 'e7e5';
  }
}