import Kickoff from "./components/match/Kickoff";
import Archive from "./components/match/Archive";
import CareerArc from "./components/match/CareerArc";
import HalfTime from "./components/match/HalfTime";
import TheNumbers from "./components/match/TheNumbers";
import PenaltyBox from "./components/match/PenaltyBox";
import TierList from "./components/match/TierList";
import FullTime from "./components/match/FullTime";

/**
 * One match, in order. Scroll position is the clock — see MatchClock.
 */
export default function Home() {
  return (
    <main>
      <Kickoff />
      <Archive />
      {/* The whistle, then the evidence: the interval resets the eye, and
          The Numbers carries the Archive (history) into the Arc (one career). */}
      <HalfTime />
      <TheNumbers />
      <CareerArc />
      <PenaltyBox />
      <TierList />
      <FullTime />
    </main>
  );
}
