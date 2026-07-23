const MODES = [
  ['none', 1],
  ['neon', 1],
  ['calico', 1],
  ['faces', 1],
  ['skills', 2],
];

export function rollRainMode(exclude) {
  const pool = MODES.filter(([id]) => id !== exclude);
  const total = pool.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;

  for (const [id, weight] of pool) {
    if ((roll -= weight) < 0) return id;
  }

  return pool[pool.length - 1][0];
}
