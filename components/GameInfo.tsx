'use client';

import type { GameState } from '@/types';
import { getPieceSymbol, getPieceValue } from '@/lib/chess-utils';

interface GameInfoProps {
  gameState: GameState;
  isAIThinking: boolean;
  onReset: () => void;
}

export default function GameInfo({ gameState, isAIThinking, onReset }: GameInfoProps) {
  const { turn, isCheck, isCheckmate, isStalemate, isDraw, moveHistory, capturedPieces } = gameState;

  // Sort captured pieces by value
  const sortedWhiteCaptured = [...capturedPieces.white].sort((a, b) => 
    getPieceValue(b) - getPieceValue(a)
  );
  const sortedBlackCaptured = [...capturedPieces.black].sort((a, b) => 
    getPieceValue(b) - getPieceValue(a)
  );

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Game Status</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Current Turn:</span>
            <span className="text-white font-semibold">
              {isAIThinking ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">AI Thinking...</span>
                </span>
              ) : (
                <span>{turn === 'w' ? 'White (You)' : 'Black (AI)'}</span>
              )}
            </span>
          </div>
          
          {isCheck && !isCheckmate && (
            <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded p-2 text-yellow-300 text-center font-semibold">
              CHECK!
            </div>
          )}
          
          {isCheckmate && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-2 text-red-300 text-center font-semibold">
              CHECKMATE! {turn === 'w' ? 'Black' : 'White'} wins!
            </div>
          )}
          
          {isStalemate && (
            <div className="bg-gray-500 bg-opacity-20 border border-gray-500 rounded p-2 text-gray-300 text-center font-semibold">
              STALEMATE - Draw!
            </div>
          )}
          
          {isDraw && !isStalemate && (
            <div className="bg-gray-500 bg-opacity-20 border border-gray-500 rounded p-2 text-gray-300 text-center font-semibold">
              DRAW!
            </div>
          )}
        </div>
        
        <button
          onClick={onReset}
          className="w-full mt-4 bg-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          New Game
        </button>
      </div>

      {/* Captured Pieces */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Captured Pieces</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">White Captured:</h3>
            <div className="flex flex-wrap gap-1">
              {sortedWhiteCaptured.length > 0 ? (
                sortedWhiteCaptured.map((piece, index) => (
                  <span key={index} className="text-2xl">
                    {getPieceSymbol(`w${piece}`)}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Black Captured:</h3>
            <div className="flex flex-wrap gap-1">
              {sortedBlackCaptured.length > 0 ? (
                sortedBlackCaptured.map((piece, index) => (
                  <span key={index} className="text-2xl">
                    {getPieceSymbol(`b${piece}`)}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Move History</h2>
        
        <div className="max-h-64 overflow-y-auto space-y-1">
          {moveHistory.length > 0 ? (
            moveHistory.map((move, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm"
              >
                <span className="text-gray-500 w-8">
                  {Math.floor(index / 2) + 1}.
                </span>
                <span className={`flex-1 ${index % 2 === 0 ? 'text-white' : 'text-gray-400'}`}>
                  {move.san}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No moves yet</p>
          )}
        </div>
      </div>
    </div>
  );
}