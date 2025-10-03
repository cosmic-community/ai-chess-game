// Chess piece types
export type PieceColor = 'w' | 'b';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface ChessSquare {
  square: string;
  piece?: ChessPiece;
}

export interface ChessMove {
  from: string;
  to: string;
  promotion?: PieceType;
  san: string;
  captured?: PieceType;
}

export interface GameState {
  fen: string;
  turn: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  moveHistory: ChessMove[];
  capturedPieces: {
    white: PieceType[];
    black: PieceType[];
  };
}

// AI response type
export interface AIMove {
  move: string;
  thinking?: string;
}