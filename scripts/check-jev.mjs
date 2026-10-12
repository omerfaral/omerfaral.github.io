// Checks the JS port (src/lib/jev.js + public/jev/model.onnx) against PyTorch reference probabilities.
// scripts/jev-ref.json is produced by the PyTorch model: [{fen, moves: [[uci, prob], ...]}]
import { readFileSync } from 'node:fs';
import * as ort from 'onnxruntime-web';
import { Chess } from 'chess.js';
import { predict } from '../src/lib/jev.js';

ort.env.wasm.numThreads = 1;
const session = await ort.InferenceSession.create(readFileSync('public/jev/model.onnx'));
const ref = JSON.parse(readFileSync('scripts/jev-ref.json', 'utf8'));
let worst = 0;
for (const { fen, moves } of ref) {
  const got = new Map((await predict(ort, session, new Chess(fen))).map(({ move, p }) => [move.lan, p]));
  if (got.size !== moves.length) throw new Error(`${fen}: ${got.size} legal moves, expected ${moves.length}`);
  for (const [uci, p] of moves) {
    if (!got.has(uci)) throw new Error(`${fen}: missing ${uci}`);
    worst = Math.max(worst, Math.abs(got.get(uci) - p));
  }
}
if (worst > 1e-4) throw new Error(`max prob diff ${worst}`);
console.log(`ok: ${ref.length} positions, max prob diff ${worst.toExponential(2)}`);
