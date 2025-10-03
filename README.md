# ♟️ AI Chess Game

![Chess Game Preview](https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=300&fit=crop&auto=format)

An intelligent chess game that lets you play against an AI-powered opponent. Built with Next.js and integrated with Cosmic AI for smart, strategic computer moves.

## Features

- **AI-Powered Opponent**: Play against Cosmic AI with intelligent move generation
- **Complete Chess Rules**: Full move validation including special moves
- **Interactive Chessboard**: Drag-and-drop interface with visual feedback
- **Move History**: Track all moves played during the game
- **Game State Management**: Proper handling of check, checkmate, and stalemate
- **Captured Pieces Display**: Visual tracker for both players
- **Responsive Design**: Optimized for desktop and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e044fd260d9dd939d1b9fe&clone_repository=68e04646260d9dd939d1ba03)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built using Cosmic AI capabilities

### Code Generation Prompt

> Create a chess game where you can play against the computer. Use Cosmic AI to make the computer moves.

The app has been tailored to work with Cosmic AI's text generation capabilities and includes all the features requested above.

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern styling framework
- **Cosmic AI**: Intelligent move generation
- **Chess.js**: Chess game logic and move validation
- **Bun**: Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your system
- A Cosmic account with API access
- Basic understanding of chess rules

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic AI Integration

This application demonstrates Cosmic AI's text generation capabilities:

### AI Move Generation
```typescript
const response = await cosmic.ai.generateText({
  prompt: `You are a chess AI. Analyze this position and provide the best move.
  
Current board (FEN): ${fen}
Legal moves: ${legalMoves.join(', ')}
Move history: ${moveHistory.slice(-5).join(', ')}

Respond with ONLY the move in standard chess notation (e.g., "e2e4", "Nf3", "O-O").
Choose a strategic move that improves your position.`,
  max_tokens: 50
});
```

### Features Powered by Cosmic AI
- Strategic position analysis
- Move selection based on game state
- Contextual decision making using move history
- Real-time response generation

## Cosmic CMS Integration

While this application primarily uses Cosmic AI for move generation, it's ready to integrate with Cosmic's content management features for:
- Storing game records
- Player profiles and statistics
- Chess puzzles and tutorials
- Tournament information

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button
2. Add your Cosmic environment variables
3. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->