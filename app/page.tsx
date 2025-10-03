import ChessGame from '@/components/ChessGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            ♟️ AI Chess Game
          </h1>
          <p className="text-gray-300 text-lg">
            Play against Cosmic AI - Test your skills!
          </p>
        </div>
        
        <ChessGame />
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Powered by Cosmic AI | You play as White, AI plays as Black</p>
        </div>
      </div>
    </main>
  );
}