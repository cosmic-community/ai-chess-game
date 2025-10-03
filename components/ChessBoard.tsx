'use client';

import { useState } from 'react';
import type { Chess, Square } from 'chess.js';
import type { GameState } from '@/types';
import { getBoardState, getPieceSymbol } from '@/lib/chess-utils';

interface ChessBoardProps {
  chess: Chess;
  gameState: GameState;
  onMove: (from: string, to: string) => Promise<boolean>;
  selectedSquare: string | null;
  onSelectSquare: (square: string | null) => void;
  isAIThinking: boolean;
}

export default function ChessBoard({
  chess,
  gameState,
  onMove,
  selectedSquare,
  onSelectSquare,
  isAIThinking,
}: ChessBoardProps) {
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);
  const boardState = getBoardState(chess);
  
  // Get valid moves for selected square
  const getValidMoves = (square: string) => {
    const moves = chess.moves({ square: square as Square, verbose: true });
    return moves.map(move => move.to);
  };

  const validMoves = selectedSquare ? getValidMoves(selectedSquare) : [];

  // Handle square click
  const handleSquareClick = async (square: string) => {
    if (isAIThinking || gameState.isGameOver) return;
    if (gameState.turn !== 'w') return; // Only allow moves on white's turn

    const piece = boardState.find(s => s.square === square)?.piece;

    // If a square is already selected
    if (selectedSquare) {
      if (validMoves.includes(square)) {
        // Make the move
        const success = await onMove(selectedSquare, square);
        if (!success) {
          onSelectSquare(null);
        }
      } else if (piece && piece.color === 'w') {
        // Select different piece
        onSelectSquare(square);
      } else {
        // Deselect
        onSelectSquare(null);
      }
    } else if (piece && piece.color === 'w') {
      // Select a piece
      onSelectSquare(square);
    }
  };

  // Drag handlers
  const handleDragStart = (square: string) => {
    if (isAIThinking || gameState.isGameOver) return;
    if (gameState.turn !== 'w') return;
    
    const piece = boardState.find(s => s.square === square)?.piece;
    if (piece && piece.color === 'w') {
      setDraggedPiece(square);
      onSelectSquare(square);
    }
  };

  const handleDragEnd = () => {
    setDraggedPiece(null);
  };

  const handleDrop = async (square: string) => {
    if (!draggedPiece) return;
    
    await onMove(draggedPiece, square);
    setDraggedPiece(null);
  };

  // Get square color
  const getSquareColor = (square: string) => {
    const file = square.charCodeAt(0) - 97; // a=0, b=1, etc.
    const rank = parseInt(square[1] || '0');
    const isLight = (file + rank) % 2 === 0;
    
    if (selectedSquare === square) {
      return 'bg-yellow-400';
    }
    
    if (validMoves.includes(square)) {
      const hasPiece = boardState.find(s => s.square === square)?.piece;
      return hasPiece ? 'bg-red-300' : 'bg-green-300';
    }
    
    return isLight ? 'bg-board-light' : 'bg-board-dark';
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
      <div className="grid grid-cols-8 gap-0 aspect-square max-w-2xl mx-auto">
        {boardState.map(({ square, piece }) => {
          const isSelected = square === selectedSquare;
          const isValidMove = validMoves.includes(square);
          const isDragging = draggedPiece === square;
          
          return (
            <div
              key={square}
              className={`
                relative flex items-center justify-center
                ${getSquareColor(square)}
                ${isValidMove ? 'cursor-pointer' : ''}
                ${isDragging ? 'opacity-50' : ''}
                transition-all duration-150
              `}
              onClick={() => handleSquareClick(square)}
              onDragOver={(e) => {
                e.preventDefault();
                if (isValidMove) {
                  e.currentTarget.classList.add('scale-105');
                }
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('scale-105');
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('scale-105');
                await handleDrop(square);
              }}
            >
              {/* Square label */}
              {square[1] === '1' && (
                <div className="absolute bottom-1 right-1 text-xs font-bold opacity-50">
                  {square[0]}
                </div>
              )}
              {square[0] === 'a' && (
                <div className="absolute top-1 left-1 text-xs font-bold opacity-50">
                  {square[1]}
                </div>
              )}
              
              {/* Piece */}
              {piece && (
                <div
                  draggable={piece.color === 'w' && !isAIThinking}
                  onDragStart={() => handleDragStart(square)}
                  onDragEnd={handleDragEnd}
                  className={`
                    text-5xl cursor-grab select-none
                    ${piece.color === 'w' && !isAIThinking ? 'hover:scale-110' : ''}
                    transition-transform duration-150
                  `}
                >
                  {getPieceSymbol(`${piece.color}${piece.type}`)}
                </div>
              )}
              
              {/* Valid move indicator */}
              {isValidMove && !piece && (
                <div className="w-4 h-4 rounded-full bg-gray-600 opacity-50" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}