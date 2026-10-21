// Everything the experience says lives here. Edit freely; no component code needs to change.
//
// Question types:
//   chips   options: string[]        multiple?: bool   max?: number
//   emoji   options: {value, emoji, label}[]
//   slider  min, max, labels[], placeholder
//   text    maxLength, placeholder
// Any question is required unless it sets required: false.

export const meta = {
  storageKey: "post-date-debrief-v1",
  title: ["So Janice…", "Post Match Interview"],
  intro: "A few quick questions about tonight. No wrong answers, and nothing leaves your device.",
  cta: "Start the debrief",
  resumeCta: "Continue the debrief",
  scoreQuestionId: "chemistry",
  scoreMax: 10,
  // The highest tier whose min is at or below the chemistry score is shown on the reveal screen.
  verdicts: [
    { min: 1, title: "A quiet night", body: "Not quite the result you hoped for. No major moments." },
{ min: 4, title: "Some promising moments", body: "A few good exchanges, but the chemistry wasn't quite consistent. Worth seeing how a second date plays out." },
{ min: 6, title: "A solid performance", body: "There was a good rhythm, and enough chemistry to keep things interesting. A rematch could be worth it." },
{ min: 8, title: "A standout performance", body: "The conversation flowed well, you are smiiling while answering this" },
{ min: 10, title: "Lebron Performance", body: "Greatest Of All Time." },
  ],
};

export const questions = [
  {
    id: "vibe", short: "First five minutes", type: "chips",
    prompt: "What were the first five minutes like?",
    hint: "Go with your gut.",
    options: ["Instantly easy", "Kinda exciting", "Calm and cozy", "Awkward, but cute", "Hard to read"],
  },
  {
    id: "conversation", short: "Conversation", type: "emoji",
    prompt: "How was the conversation?",
    options: [
      { value: 1, emoji: "😴", label: "I rather sleep" },
      { value: 2, emoji: "🙂", label: "Ok Lo" },
      { value: 3, emoji: "😊", label: "Quite nice what" },
      { value: 4, emoji: "😍", label: "Holyshit this guy talks alot eh" },
      { value: 5, emoji: "🐐", label: "Keep talking my GOAT" },
    ],
  },
  {
    id: "standout", short: "Stood out", type: "chips", multiple: true, max: 3,
    prompt: "What stood out?",
    hint: "Pick up to three.",
    options: ["His autism", "The Jokes", "His shyness", "Their style", "The venue", "The food", "The silences"],
  },
  {
    id: "chemistry", short: "Chemistry", type: "slider", min: 1, max: 10,
    prompt: "Chemistry, honestly?",
    hint: "Drag the heart, or tap a number.",
    placeholder: "Drag the heart",
    error: "Set a chemistry score to continue.",
    labels: ["Oh Hell No", "Friendly", "Polite", "Pleasant", "Warm-ish", "Maybe a spark", "Definitely a spark", "Hard to stop smiling", "Protons and Electrons", "Beauty and the Beast"],
  },
  {
    id: "comfort", short: "Felt like", type: "emoji",
    prompt: "How much like yourself did you feel?",
    options: [
      { value: 1, emoji: "😬", label: "Guarded" },
      { value: 2, emoji: "😅", label: "A bit stiff" },
      { value: 3, emoji: "🙂", label: "Mostly me" },
      { value: 4, emoji: "😌", label: "Relaxed" },
      { value: 5, emoji: "🥰", label: "Completely me" },
    ],
  },
  {
    id: "second", short: "Second date", type: "chips",
    prompt: "Second date?",
    options: ["Yes, please", "Maybe, let me sleep on it", "Probably not"],
  },
  {
    id: "unsaid", short: "Unsaid", type: "text", required: false, maxLength: 280,
    prompt: "A comment you would leave about this crumb ass dude",
    hint: "Optional. Skip it if nothing comes to mind.",
    placeholder: "Maybe....",
  },
  {
    id: "next", short: "Next move", type: "chips",
    prompt: "What's the move from here?",
    options: ["Text tonight", "Text tomorrow", "Let them text first", "Blocked-Bye!"],
  },
];
