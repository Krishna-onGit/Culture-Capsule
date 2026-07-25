/**
 * All site content lives here. One shape per concept, no duplication.
 *
 * Editorial rules for this project:
 *  - No invented quotes, endorsements or affiliations. Every moment below is a
 *    documented, checkable fact.
 *  - The only images of people are the official player portraits TheSportsDB
 *    returns for the player being named. No stock photography stands in for
 *    anyone. The rest of the visual language is typography and diagrams.
 *  - One number, one source. Career figures are derived from SPELLS below so
 *    the Numbers section, the Arc and the Argument can never disagree.
 */

export type Side = {
  /** 3-letter code shown while the crest loads, and if the API is unreachable */
  code: string;
  /** TheSportsDB search term — verified to resolve (see scripts/verify-teams) */
  query: string;
};

export type Moment = {
  id: string;
  year: number;
  minute: string;
  title: string;
  venue: string;
  score: string;
  teams: [Side, Side];
  line: string;
  detail: string;
  /**
   * Atmosphere plate behind the panel, from /public/moments.
   * Optional by design — a missing file just leaves the panel as it was.
   */
  image?: string;
  /** Documented match facts. Historical fixtures are not in any free API, so these are curated. */
  facts: {
    competition: string;
    round: string;
    attendance: string;
    /** What the result actually changed — the "so what" of the moment */
    consequence: string;
  };
  /** Normalised pitch coords (0-100 x, 0-100 y) for the play diagram */
  path: { x: number; y: number }[];
};

export const MOMENTS: Moment[] = [
  {
    id: "maracanazo",
    image: "/moments/maracanazo.jpg",
    year: 1950,
    minute: "79'",
    title: "The Silence",
    venue: "Maracanã, Rio de Janeiro",
    score: "1–2",
    teams: [
      { code: "BRA", query: "Brazil" },
      { code: "URU", query: "Uruguay" },
    ],
    line: "Two hundred thousand people stopped breathing at once.",
    detail:
      "Brazil needed only a draw. Ghiggia went past the full-back and shot at the near post. The loudest stadium ever built made no sound at all.",
    facts: {
      competition: "FIFA World Cup",
      round: "Final round, deciding match",
      attendance: "173,850 official",
      consequence:
        "Brazil abandoned their white kit in response. The yellow shirt was designed three years later.",
    },
    path: [
      { x: 62, y: 78 },
      { x: 78, y: 62 },
      { x: 88, y: 46 },
      { x: 96, y: 42 },
    ],
  },
  {
    id: "carlos-alberto",
    image: "/moments/carlos-alberto.jpg",
    year: 1970,
    minute: "86'",
    title: "The Team Goal",
    venue: "Estadio Azteca, Mexico City",
    score: "4–1",
    teams: [
      { code: "BRA", query: "Brazil" },
      { code: "ITA", query: "Italy" },
    ],
    line: "Nine touches. Eight players. One inevitability.",
    detail:
      "It began in Brazil's own half and ended with Pelé rolling the ball sideways without looking, into the run of a captain nobody had tracked.",
    facts: {
      competition: "FIFA World Cup",
      round: "Final",
      attendance: "107,412",
      consequence:
        "Brazil's third title let them keep the Jules Rimet trophy permanently. A new trophy had to be commissioned.",
    },
    path: [
      { x: 14, y: 52 },
      { x: 30, y: 30 },
      { x: 44, y: 58 },
      { x: 58, y: 40 },
      { x: 70, y: 66 },
      { x: 78, y: 50 },
      { x: 92, y: 62 },
    ],
  },
  {
    id: "maradona-86",
    image: "/moments/maradona-86.jpg",
    year: 1986,
    minute: "55'",
    title: "Sixty Metres",
    venue: "Estadio Azteca, Mexico City",
    score: "2–1",
    teams: [
      { code: "ARG", query: "Argentina" },
      { code: "ENG", query: "England" },
    ],
    line: "Four minutes after the worst goal, the best one.",
    detail:
      "He collected it in his own half facing his own goal, turned, and beat half a team across sixty metres and roughly eleven seconds.",
    facts: {
      competition: "FIFA World Cup",
      round: "Quarter-final",
      attendance: "114,580",
      consequence:
        "Voted Goal of the Century by FIFA voters in 2002. Argentina went on to win the tournament.",
    },
    path: [
      { x: 20, y: 52 },
      { x: 34, y: 44 },
      { x: 48, y: 50 },
      { x: 62, y: 42 },
      { x: 74, y: 48 },
      { x: 86, y: 44 },
      { x: 94, y: 50 },
    ],
  },
  {
    id: "camp-nou-99",
    image: "/moments/camp-nou-99.jpg",
    year: 1999,
    minute: "90+3'",
    title: "Ninety Seconds",
    venue: "Camp Nou, Barcelona",
    score: "2–1",
    teams: [
      { code: "MUN", query: "Manchester United" },
      { code: "BAY", query: "Bayern Munich" },
    ],
    line: "The trophy already had the wrong ribbons on it.",
    detail:
      "Bayern led into stoppage time. United scored twice in a hundred seconds from two corners. Football, as the commentary went, bloody hell.",
    facts: {
      competition: "UEFA Champions League",
      round: "Final",
      attendance: "90,245",
      consequence:
        "Completed the only treble in English football at that point — league, FA Cup and European Cup in one season.",
    },
    path: [
      { x: 88, y: 8 },
      { x: 74, y: 34 },
      { x: 84, y: 44 },
      { x: 94, y: 50 },
    ],
  },
  {
    id: "istanbul",
    image: "/moments/istanbul.jpg",
    year: 2005,
    minute: "HT",
    title: "Three Down",
    venue: "Atatürk Stadium, Istanbul",
    score: "3–3",
    teams: [
      { code: "LIV", query: "Liverpool" },
      { code: "MIL", query: "AC Milan" },
    ],
    line: "Nobody comes back from three goals down in a European Cup final.",
    detail:
      "Six minutes in the second half undid forty-five in the first. It went to penalties, and a goalkeeper's wandering legs settled it.",
    facts: {
      competition: "UEFA Champions League",
      round: "Final — won 3–2 on penalties",
      attendance: "69,000",
      consequence:
        "Liverpool's fifth European Cup earned them the trophy permanently, and a special exemption to defend it.",
    },
    path: [
      { x: 40, y: 20 },
      { x: 58, y: 38 },
      { x: 72, y: 30 },
      { x: 86, y: 46 },
      { x: 95, y: 50 },
    ],
  },
  {
    id: "aguero",
    image: "/moments/aguero.jpg",
    year: 2012,
    minute: "93:20",
    title: "Agüerooo",
    venue: "Etihad Stadium, Manchester",
    score: "3–2",
    teams: [
      { code: "MCI", query: "Manchester City" },
      { code: "QPR", query: "Queens Park Rangers" },
    ],
    line: "A forty-four year wait decided with twenty seconds left in the season.",
    detail:
      "City needed two goals in stoppage time to take the title on goal difference. They got both. The second arrived at 93 minutes and 20 seconds.",
    facts: {
      competition: "Premier League",
      round: "Matchday 38 — final day",
      attendance: "47,435",
      consequence:
        "City took the title from United on goal difference alone, having been eight points behind in April.",
    },
    path: [
      { x: 56, y: 66 },
      { x: 70, y: 58 },
      { x: 82, y: 52 },
      { x: 95, y: 48 },
    ],
  },
  {
    id: "mineirazo",
    image: "/moments/mineirazo.jpg",
    year: 2014,
    minute: "29'",
    title: "Seven",
    venue: "Mineirão, Belo Horizonte",
    score: "1–7",
    teams: [
      { code: "BRA", query: "Brazil" },
      { code: "GER", query: "Germany" },
    ],
    line: "Four goals in six minutes, in a World Cup semi-final, at home.",
    detail:
      "Between the 23rd and 29th minute the host nation conceded four times. The stadium went from noise, to silence, to applauding the opposition.",
    facts: {
      competition: "FIFA World Cup",
      round: "Semi-final",
      attendance: "58,141",
      consequence:
        "Brazil's heaviest ever defeat, and the end of a 62-year unbeaten run in competitive home matches.",
    },
    path: [
      { x: 30, y: 40 },
      { x: 48, y: 46 },
      { x: 64, y: 38 },
      { x: 80, y: 52 },
      { x: 94, y: 46 },
    ],
  },
  {
    id: "lusail",
    image: "/moments/lusail.jpg",
    year: 2022,
    minute: "108'",
    title: "The Last One",
    venue: "Lusail Stadium, Qatar",
    score: "3–3",
    teams: [
      { code: "ARG", query: "Argentina" },
      { code: "FRA", query: "France" },
    ],
    line: "The only thing he had never won, in the last match he would ever play for it.",
    detail:
      "Two goals up, pegged back, ahead again in extra time, pegged back again. Then penalties. The best final anyone could remember.",
    facts: {
      competition: "FIFA World Cup",
      round: "Final — won 4–2 on penalties",
      attendance: "88,966",
      consequence:
        "Argentina's third title, 36 years after their second. Only the second final ever to feature a hat-trick.",
    },
    path: [
      { x: 66, y: 58 },
      { x: 78, y: 44 },
      { x: 88, y: 52 },
      { x: 96, y: 48 },
    ],
  },
];

/* ------------------------------------------------------------------ */

/**
 * 48' — THE NUMBERS
 * The bridge between the Archive (history that happened to everyone) and the
 * Arc (one career). Season-by-season figures, all competitions.
 *
 * The Barcelona and Paris spells are finished, so those numbers are final and
 * will not drift. Inter Miami is ongoing and is deliberately carried as a spell
 * total rather than invented per-season detail — see SEASON_COVERAGE, which is
 * what the chart uses to say so out loud.
 */
export type Season = {
  label: string;
  club: "BAR" | "PSG" | "MIA";
  apps: number;
  goals: number;
};

export const SEASONS: Season[] = [
  { label: "04/05", club: "BAR", apps: 9, goals: 1 },
  { label: "05/06", club: "BAR", apps: 25, goals: 8 },
  { label: "06/07", club: "BAR", apps: 36, goals: 17 },
  { label: "07/08", club: "BAR", apps: 40, goals: 16 },
  { label: "08/09", club: "BAR", apps: 51, goals: 38 },
  { label: "09/10", club: "BAR", apps: 53, goals: 47 },
  { label: "10/11", club: "BAR", apps: 55, goals: 53 },
  { label: "11/12", club: "BAR", apps: 60, goals: 73 },
  { label: "12/13", club: "BAR", apps: 50, goals: 60 },
  { label: "13/14", club: "BAR", apps: 46, goals: 41 },
  { label: "14/15", club: "BAR", apps: 57, goals: 58 },
  { label: "15/16", club: "BAR", apps: 49, goals: 41 },
  { label: "16/17", club: "BAR", apps: 52, goals: 54 },
  { label: "17/18", club: "BAR", apps: 54, goals: 45 },
  { label: "18/19", club: "BAR", apps: 50, goals: 51 },
  { label: "19/20", club: "BAR", apps: 44, goals: 31 },
  { label: "20/21", club: "BAR", apps: 47, goals: 38 },
  { label: "21/22", club: "PSG", apps: 34, goals: 11 },
  { label: "22/23", club: "PSG", apps: 41, goals: 21 },
];

export type Spell = {
  id: "ALL" | "BAR" | "PSG" | "MIA" | "ARG";
  name: string;
  years: string;
  query: string | null;
  code: string;
  apps: number;
  goals: number;
  trophies: number;
  note: string;
};

/**
 * The four real spells. "Everything" is derived from these below rather than
 * typed out again — the two used to be maintained by hand and had drifted
 * twenty-seven appearances apart, which a visitor could catch by adding up the
 * four tabs sitting next to it.
 */
const SPELL_PARTS: Spell[] = [
  {
    id: "BAR", name: "Barcelona", years: "2004—2021", query: "Barcelona", code: "BAR",
    apps: 778, goals: 672, trophies: 35,
    note: "Seventeen seasons, four European Cups, ten league titles. The record is closed.",
  },
  {
    id: "PSG", name: "Paris", years: "2021—2023", query: "Paris St Germain", code: "PSG",
    apps: 75, goals: 32, trophies: 3,
    note: "Two seasons that nobody, including him, seems to remember fondly.",
  },
  {
    id: "MIA", name: "Inter Miami", years: "2023—", query: "Inter Miami", code: "MIA",
    apps: 100, goals: 80, trophies: 4,
    note: "A club with no trophies at all until he arrived. Ongoing, so treat as approximate.",
  },
  {
    id: "ARG", name: "Argentina", years: "2005—", query: "Argentina", code: "ARG",
    apps: 194, goals: 112, trophies: 4,
    note: "Sixteen years without a senior trophy, then four in four years.",
  },
];

const total = (key: "apps" | "goals" | "trophies") =>
  SPELL_PARTS.reduce((n, s) => n + s[key], 0);

/** The one career total the whole site quotes. Nothing hard-codes it. */
export const CAREER_TOTALS = {
  apps: total("apps"),
  goals: total("goals"),
  trophies: total("trophies"),
};

export const SPELLS: Spell[] = [
  {
    id: "ALL", name: "Everything", years: "2004—", query: null, code: "ALL",
    ...CAREER_TOTALS,
    note: "Club and country combined, all senior competitions — the four spells added together.",
  },
  ...SPELL_PARTS,
];

/**
 * Which spells the season-by-season chart can actually break down.
 * Miami and Argentina have no per-season rows here, and the chart says so
 * rather than quietly showing the Barcelona and Paris years underneath the
 * wrong heading.
 */
export const SEASON_COVERAGE: Record<Spell["id"], "own" | "club-run" | "none"> = {
  ALL: "club-run",
  BAR: "own",
  PSG: "own",
  MIA: "none",
  ARG: "none",
};

/** Records worth arguing over — each one checkable. */
export const RECORDS = [
  { value: "91", label: "Goals in a calendar year", detail: "2012. The previous record had stood since 1972." },
  { value: "8", label: "Ballon d'Or", detail: "Nobody else has more than five." },
  { value: "474", label: "La Liga goals", detail: "The competition's all-time record." },
  { value: "21", label: "Seasons scoring 20+", detail: "Consecutive, across three countries." },
];

/* ------------------------------------------------------------------ */

export type CareerNode = {
  year: number;
  place: string;
  club: string;
  note: string;
  stat?: string;
  /** Crest lookup for this stop, where one exists */
  query?: string;
  code?: string;
  /**
   * Running career totals at this point — the line has a quantity, not just a
   * shape. Club and country combined, so the club component always agrees with
   * SEASONS above and the final stop always equals CAREER_TOTALS.
   */
  totals?: { apps: number; goals: number; trophies: number };
};

export type Career = {
  id: string;
  name: string;
  born: string;
  tagline: string;
  nodes: CareerNode[];
};

export const CAREERS: Career[] = [
  {
    id: "arc-10",
    name: "The Number Ten",
    born: "Rosario, 1987",
    tagline: "A growth hormone deficiency, a napkin contract, and 1,000+ games.",
    nodes: [
      {
        year: 2000, place: "Rosario → Barcelona", club: "LA MASIA", stat: "AGE 13",
        query: "Barcelona", code: "FCB",
        note: "Signs on a paper napkin at thirteen. The club pays for his growth hormone treatment.",
        totals: { apps: 0, goals: 0, trophies: 0 },
      },
      {
        year: 2004, place: "Camp Nou", club: "DEBUT", stat: "AGE 17",
        query: "Barcelona", code: "FCB",
        note: "First-team debut at seventeen years and 114 days, as a substitute in a derby.",
        totals: { apps: 9, goals: 1, trophies: 1 },
      },
      {
        year: 2009, place: "Rome", club: "FIRST TREBLE", stat: "×3",
        query: "Barcelona", code: "FCB",
        note: "League, cup and European Cup in a single season, plus a header in the final.",
        // 161 club apps / 80 goals through 08/09 in SEASONS, plus ~46 caps
        totals: { apps: 207, goals: 93, trophies: 8 },
      },
      {
        year: 2012, place: "Barcelona", club: "91 GOALS", stat: "91",
        query: "Barcelona", code: "FCB",
        note: "A calendar-year scoring record across club and country that still stands.",
        totals: { apps: 405, goals: 284, trophies: 19 },
      },
      {
        year: 2015, place: "Berlin", club: "SECOND TREBLE", stat: "×6",
        query: "Barcelona", code: "FCB",
        note: "Barcelona become the only club to have won the treble twice.",
        totals: { apps: 589, goals: 458, trophies: 24 },
      },
      {
        year: 2021, place: "Paris", club: "DEPARTURE", stat: "21 YRS",
        query: "Paris St Germain", code: "PSG",
        note: "Leaves the only club he had ever played for, announced in tears at a press conference.",
        // the closed Barcelona spell (778/672) plus the caps won by then
        totals: { apps: 929, goals: 748, trophies: 36 },
      },
      {
        year: 2022, place: "Lusail", club: "THE CUP", stat: "★",
        query: "Argentina", code: "ARG",
        note: "The one trophy missing, at the last tournament he would play for it.",
        totals: { apps: 1003, goals: 793, trophies: 39 },
      },
      {
        year: 2023, place: "Miami", club: "THE LEAGUE", stat: "→",
        query: "Inter Miami", code: "MIA",
        note: "Moves to a league whose club had never won a trophy. It won one within two months.",
        // the last stop is the career to date, so it must equal the Numbers section
        totals: { ...CAREER_TOTALS },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export type Contender = {
  id: string;
  name: string;
  /** TheSportsDB player lookup */
  query: string;
  era: string;
  country: string;
  claim: string;
  /** Career figures, all senior club + country, rounded to the commonly cited totals */
  figures: { goals: number; worldCups: number; europeanCups: number; ballonDOr: number };
  /** Still playing — the figures are a snapshot, and the section says so */
  ongoing?: boolean;
};

/** Deliberately unranked. The ranking is the visitor's job. */
export const CONTENDERS: Contender[] = [
  { id: "c1", name: "PELÉ", query: "Pele", era: "1956–77", country: "Brazil",
    claim: "Three World Cups. Nobody else has more than one as a decisive player.",
    figures: { goals: 767, worldCups: 3, europeanCups: 0, ballonDOr: 0 } },
  { id: "c2", name: "MARADONA", query: "Diego Maradona", era: "1976–97", country: "Argentina",
    claim: "Carried a mid-table side to the Italian title. Twice.",
    figures: { goals: 353, worldCups: 1, europeanCups: 0, ballonDOr: 0 } },
  { id: "c3", name: "CRUYFF", query: "Johan Cruyff", era: "1964–84", country: "Netherlands",
    claim: "Changed how the sport is thought about, not just how it is played.",
    figures: { goals: 291, worldCups: 0, europeanCups: 3, ballonDOr: 3 } },
  // goals here is CAREER_TOTALS.goals — the Numbers section and the Arc quote the
  // same figure, and a visitor comparing the two sections will notice if it moves
  { id: "c4", name: "MESSI", query: "Lionel Messi", era: "2004–", country: "Argentina",
    claim: "Every scoring record worth holding, and finally the trophy.",
    figures: { goals: CAREER_TOTALS.goals, worldCups: 1, europeanCups: 4, ballonDOr: 8 },
    ongoing: true },
  { id: "c5", name: "RONALDO", query: "Cristiano Ronaldo", era: "2002–", country: "Portugal",
    claim: "Five European Cups across three countries and three leagues.",
    figures: { goals: 950, worldCups: 0, europeanCups: 5, ballonDOr: 5 },
    ongoing: true },
  { id: "c6", name: "R. NAZÁRIO", query: "Ronaldo", era: "1993–2011", country: "Brazil",
    claim: "Two ruptured knees. Still the best pure striker anyone saw.",
    figures: { goals: 414, worldCups: 2, europeanCups: 0, ballonDOr: 2 } },
  { id: "c7", name: "BECKENBAUER", query: "Franz Beckenbauer", era: "1964–83", country: "Germany",
    claim: "Invented the modern sweeper, then won everything from the position.",
    figures: { goals: 106, worldCups: 1, europeanCups: 3, ballonDOr: 2 } },
  { id: "c8", name: "ZIDANE", query: "Zinedine Zidane", era: "1988–2006", country: "France",
    claim: "The best big-occasion player of his generation, in both finals he decided.",
    figures: { goals: 156, worldCups: 1, europeanCups: 1, ballonDOr: 1 } },
  { id: "c9", name: "DI STÉFANO", query: "Alfredo Di Stefano", era: "1945–66", country: "Argentina",
    claim: "Five European Cups in a row, scoring in every one of the finals.",
    figures: { goals: 377, worldCups: 0, europeanCups: 5, ballonDOr: 2 } },
  { id: "c10", name: "GARRINCHA", query: "Garrincha", era: "1953–72", country: "Brazil",
    claim: "Brazil lost once in eleven years while he was on the pitch.",
    figures: { goals: 249, worldCups: 2, europeanCups: 0, ballonDOr: 0 } },
];

/* ------------------------------------------------------------------ */

/**
 * Where penalties actually go, and how often they are scored.
 * Zone order matches the six targets in the penalty section, reading left to
 * right, top row then bottom row. Figures are the well-documented shape of
 * top-flight penalty taking: roughly three in four are scored, height matters
 * more than width (every high target outscores every low one), and the low
 * centre is the worst place on the goal.
 *
 * distribution sums to 1, and distribution · scoreRate = 0.76, so the headline
 * conversion rate is the one the zone table actually implies.
 */
export const PENALTY_REALITY = {
  conversion: 0.76,
  /** share of all penalties aimed at each zone */
  distribution: [0.13, 0.06, 0.14, 0.27, 0.13, 0.27],
  /** scoring rate when aimed at each zone */
  scoreRate: [0.88, 0.81, 0.87, 0.72, 0.64, 0.73],
  labels: ["Top L", "Top C", "Top R", "Low L", "Low C", "Low R"],
};

export const TIERS = [
  { id: "s", label: "IMMORTAL", hint: "Changed the sport" },
  { id: "a", label: "ALL-TIME", hint: "Best of an era" },
  { id: "b", label: "GREAT", hint: "Would walk into any side" },
] as const;

/* ------------------------------------------------------------------ */

/**
 * Section markers — the match clock reads from these, and they must stay in the
 * same order as the sections in page.tsx.
 */
export const FIXTURES = [
  { id: "kickoff", minute: 0, label: "KICK OFF" },
  { id: "archive", minute: 12, label: "THE ARCHIVE" },
  { id: "halftime", minute: 45, label: "HALF TIME" },
  { id: "numbers", minute: 48, label: "THE NUMBERS" },
  { id: "arc", minute: 52, label: "THE ARC" },
  { id: "penalty", minute: 66, label: "THE SPOT" },
  { id: "tierlist", minute: 78, label: "THE ARGUMENT" },
  { id: "fulltime", minute: 90, label: "FULL TIME" },
] as const;
