"use client";

import { useSyncExternalStore } from "react";

/**
 * What the visitor did during the match. The interactive sections write here,
 * and Full Time reads it back — so the toys are part of one match rather than
 * two isolated gadgets.
 */
export type MatchSession = {
  /** zone index per penalty taken, 0-5 */
  shots: number[];
  /** whether each of those kicks was scored, same order as `shots` */
  outcomes: boolean[];
  scored: number;
  /** contender id -> tier id */
  ranking: Record<string, string | null>;
};

let state: MatchSession = { shots: [], outcomes: [], scored: 0, ranking: {} };
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const session = {
  recordShot(zone: number, scored: boolean) {
    state = {
      ...state,
      shots: [...state.shots, zone],
      outcomes: [...state.outcomes, scored],
      scored: state.scored + (scored ? 1 : 0),
    };
    emit();
  },
  resetShots() {
    state = { ...state, shots: [], outcomes: [], scored: 0 };
    emit();
  },
  setRanking(ranking: Record<string, string | null>) {
    state = { ...state, ranking };
    emit();
  },
  reset() {
    state = { shots: [], outcomes: [], scored: 0, ranking: {} };
    emit();
  },
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const getSnapshot = () => state;
/** Server render sees the empty match — no hydration mismatch. */
const getServerSnapshot = () => state;

export function useSession(): MatchSession {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
