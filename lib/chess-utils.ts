import { Chess } from 'chess.js';
import type { ChessMove, GameState, PieceType } from '@/types';

// Get piece unicode symbol
export function getPieceSymbol(piece: string): string {
  const symbols: Record<string, string> = {
    'wk': '♔', 'wq': '♕', 'wr': '♖', 'wb': '♗', 'wn': '♘', 'wp': '♙',
    'bk': '♚', 'bq': '♛', 'br': '♜', 'bb': '♝', 'bn': '♞', 'bp': '♟',
  };
  return symbols[piece] || '';
}

// Convert chess.js board to our format
export function getBoardState(chess: Chess) {
  const board = chess.board();
  const squares = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row]?.[col];
      const file = String.fromCharCode(97 + col); // a-h
      const rank = 8 - row; // 8-1
      const square = `${file}${rank}`;
      
      squares.push({
        square,
        piece: piece ? { type: piece.type, color: piece.color } : undefined,
      });
    }
  }
  
  return squares;
}

// Get game state from chess instance
export function getGameState(chess: Chess, moveHistory: ChessMove[]): GameState {
  return {
    fen: chess.fen(),
    turn: chess.turn(),
    isCheck: chess.isCheck(),
    isCheckmate: chess.isCheckmate(),
    isStalemate: chess.isStalemate(),
    isDraw: chess.isDraw(),
    isGameOver: chess.isGameOver(),
    moveHistory,
    capturedPieces: getCapturedPieces(moveHistory),
  };
}

// Calculate captured pieces from move history
function getCapturedPieces(moveHistory: ChessMove[]): { white: PieceType[]; black: PieceType[] } {
  const captured = { white: [] as PieceType[], black: [] as PieceType[] };
  
  moveHistory.forEach((move, index) => {
    if (move.captured) {
      // Even index = white's turn, odd = black's turn
      if (index % 2 === 0) {
        captured.black.push(move.captured);
      } else {
        captured.white.push(move.captured);
      }
    }
  });
  
  return captured;
}

// Get piece value for sorting captured pieces
export function getPieceValue(piece: PieceType): number {
  const values: Record<PieceType, number> = {
    'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0,
  };
  return values[piece] || 0;
}