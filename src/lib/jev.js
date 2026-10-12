// JS port of jev-chess/jev.py (encode, move_index, predict). Must stay bit-identical to the Python side:
// check with `node scripts/check-jev.mjs` after any change here.
const PIECE = { p: 1, n: 2, b: 3, r: 4, q: 5, k: 6 };
const PROMO = { n: 0, b: 1, r: 2 }; // queen promotion uses the plain from*64+to index

// python-chess square index: a1=0 ... h8=63
const sq = (s) => (s.charCodeAt(1) - 49) * 8 + (s.charCodeAt(0) - 97);

// Board is always seen from the side to move: for black, ranks are mirrored and colors swapped.
export function encode(game) {
  const us = game.turn();
  const flip = us === 'b' ? 56 : 0;
  const toks = new Array(65).fill(0);
  for (const row of game.board())
    for (const p of row)
      if (p) toks[sq(p.square) ^ flip] = PIECE[p.type] + (p.color === us ? 0 : 6);
  const them = us === 'w' ? 'b' : 'w';
  const a = game.getCastlingRights(us), b = game.getCastlingRights(them);
  const meta = (+a.k) | (+a.q << 1) | (+b.k << 2) | (+b.q << 3);
  const ep = game.moves({ verbose: true }).find((m) => m.flags.includes('e'));
  toks[64] = 13 + meta * 9 + (ep ? ep.to.charCodeAt(0) - 96 : 0);
  return toks;
}

export function moveIndex(m, whiteToMove) {
  let f = sq(m.from), t = sq(m.to);
  if (!whiteToMove) { f ^= 56; t ^= 56; }
  if (m.promotion in PROMO) return 4096 + ((f % 8) * 3 + (t % 8) - (f % 8) + 1) * 3 + PROMO[m.promotion];
  return f * 64 + t;
}

// Returns [{move, p}] over legal moves, best first. `ort` and `session` are injected so this runs in browser and Node.
export async function predict(ort, session, game) {
  const moves = game.moves({ verbose: true });
  const x = new ort.Tensor('int64', BigInt64Array.from(encode(game), BigInt), [1, 65]);
  const logits = (await session.run({ tokens: x })).logits.data;
  const white = game.turn() === 'w';
  const z = moves.map((m) => logits[moveIndex(m, white)]);
  const mx = Math.max(...z);
  const e = z.map((v) => Math.exp(v - mx));
  const s = e.reduce((a, b) => a + b, 0);
  return moves.map((m, i) => ({ move: m, p: e[i] / s })).sort((a, b) => b.p - a.p);
}
