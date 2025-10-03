'use client';

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';
import GameInfo from './GameInfo';
import type { ChessMove, GameState } from '@/types';
import { getGameState } from '@/lib/chess-utils';

export default function ChessGame() {
  const [chess] = useState(() => new Chess());
  const [gameState, setGameState] = useState<GameState>(() => getGameState(chess, []));
  const [moveHistory, setMoveHistory] = useState<ChessMove[]>([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  // Handle player move
  const handleMove = async (from: string, to: string) => {
    try {
      // Attempt the move
      const move = chess.move({ from, to, promotion: 'q' });
      
      if (!move) {
        return false;
      }

      // Update move history
      const newMoveHistory = [...moveHistory, {
        from: move.from,
        to: move.to,
        san: move.san,
        captured: move.captured,
      } as ChessMove];
      
      setMoveHistory(newMoveHistory);
      setGameState(getGameState(chess, newMoveHistory));
      setSelectedSquare(null);

      // Check if game is over
      if (chess.isGameOver()) {
        return true;
      }

      // Get AI move
      setIsAIThinking(true);
      await makeAIMove(newMoveHistory);
      
      return true;
    } catch (error) {
      console.error('Error making move:', error);
      return false;
    }
  };

  // Make AI move
  const makeAIMove = async (currentHistory: ChessMove[]) => {
    try {
      const legalMoves = chess.moves({ verbose: true }).map(m => `${m.from}${m.to}`);
      const fen = chess.fen();
      const history = currentHistory.map(m => m.san);

      const response = await fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, legalMoves, moveHistory: history }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI move');
      }

      const data = await response.json();
      const aiMoveString = data.move;

      // Parse the move string (e.g., "e7e5")
      if (aiMoveString && aiMoveString.length >= 4) {
        const from = aiMoveString.substring(0, 2);
        const to = aiMoveString.substring(2, 4);
        const promotion = aiMoveString.length > 4 ? aiMoveString[4] : undefined;

        const move = chess.move({ from, to, promotion });
        
        if (move) {
          const newMoveHistory = [...currentHistory, {
            from: move.from,
            to: move.to,
            san: move.san,
            captured: move.captured,
          } as ChessMove];
          
          setMoveHistory(newMoveHistory);
          setGameState(getGameState(chess, newMoveHistory));
        }
      }
    } catch (error) {
      console.error('Error making AI move:', error);
    } finally {
      setIsAIThinking(false);
    }
  };

  // Reset game
  const handleReset = () => {
    chess.reset();
    setMoveHistory([]);
    setGameState(getGameState(chess, []));
    setSelectedSquare(null);
    setIsAIThinking(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ChessBoard
          chess={chess}
          gameState={gameState}
          onMove={handleMove}
          selectedSquare={selectedSquare}
          onSelectSquare={setSelectedSquare}
          isAIThinking={isAIThinking}
        />
      </div>
      
      <div className="lg:col-span-1">
        <GameInfo
          gameState={gameState}
          isAIThinking={isAIThinking}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}