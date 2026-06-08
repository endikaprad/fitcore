interface SetHistory {
  weight: number;
  targetReps: number;
  actualReps: number;
}

interface SessionHistory {
  sets: SetHistory[];
}

export function suggestWeight(history: SessionHistory[]): number | null {
  if (!history.length) return null;

  const last = history[history.length - 1];
  if (!last.sets.length) return null;

  const lastWorkingSet = last.sets.filter((s) => s.weight > 0).slice(-1)[0];
  if (!lastWorkingSet) return null;

  const failedReps = lastWorkingSet.actualReps < lastWorkingSet.targetReps - 2;
  const hitAll = last.sets.every((s) => s.actualReps >= s.targetReps);

  if (hitAll) return Math.round((lastWorkingSet.weight + 2.5) * 2) / 2;
  if (failedReps) return Math.round(lastWorkingSet.weight * 0.95 * 2) / 2;

  return lastWorkingSet.weight;
}
