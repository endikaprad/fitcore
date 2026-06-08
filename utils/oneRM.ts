// Epley formula: 1RM = weight × (1 + reps / 30)
export function epley(weight: number, reps: number): number {
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

// Brzycki formula: 1RM = weight / (1.0278 - 0.0278 × reps)
export function brzycki(weight: number, reps: number): number {
  if (reps >= 37) return weight;
  return Math.round((weight / (1.0278 - 0.0278 * reps)) * 10) / 10;
}
