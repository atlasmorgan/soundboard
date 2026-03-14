// ============================================================
//  MEME SOUNDBOARD — app.js
//  Three things you'll learn here:
//    1. Arrays & objects  — storing your sound data
//    2. DOM manipulation  — building buttons with JavaScript
//    3. Event listeners   — making buttons react to clicks
//    4. Web Audio API     — playing sounds with new Audio()
// ============================================================


// ----------------------------------------------------------
// 1. SOUND DATA
//    Each sound is an object with a name, emoji, and file.
//    We store them all in an array called `sounds`.
// ----------------------------------------------------------
const sounds = [
  // Page 1
  { name: "Vine Boom",       emoji: "💥", file: "sounds/vine-boom.mp3" },
  { name: "Bruh",            emoji: "😐", file: "sounds/bruh.mp3"      },
  { name: "Oof",             emoji: "😬", file: "sounds/oof.mp3"       },
  { name: "Air Horn",        emoji: "📯", file: "sounds/airhorn.mp3"   },
  { name: "Nyan Cat",        emoji: "🐱", file: "sounds/nyan.mp3"      },
  { name: "Laugh Track",     emoji: "😂", file: "sounds/laugh.mp3"     },
  { name: "Sad Trombone",    emoji: "🎺", file: "sounds/sad-trombone.mp3" },
  { name: "Wilhelm Scream",  emoji: "😱", file: "sounds/wilhelm.mp3"   },
  { name: "Roundabout",      emoji: "🎵", file: "sounds/roundabout.mp3"},
  { name: "Fart",            emoji: "💨", file: "sounds/fart.mp3"      },
  { name: "It's a Prank",    emoji: "🐸", file: "sounds/prank.mp3"     },
  { name: "Turtle",          emoji: "🐢", file: "sounds/turtle.mp3"    },
  // Page 2
  { name: "Dramatic Chipmunk", emoji: "🐿️", file: "sounds/dramatic-chipmunk.mp3" },
  { name: "Oh No",             emoji: "😨", file: "sounds/oh-no.mp3"              },
  { name: "Windows XP Error",  emoji: "💻", file: "sounds/windows-xp.mp3"         },
  { name: "Mario Coin",        emoji: "🪙", file: "sounds/mario-coin.mp3"          },
  { name: "Emergency Meeting", emoji: "🚨", file: "sounds/emergency.mp3"           },
  { name: "What Are Those",    emoji: "👟", file: "sounds/what-are-those.mp3"      },
  { name: "Minecraft Ow",      emoji: "⛏️", file: "sounds/minecraft-ow.mp3"       },
  { name: "Rickroll",          emoji: "🎤", file: "sounds/rickroll.mp3"            },
  { name: "Bonk",              emoji: "🔨", file: "sounds/bonk.mp3"               },
  { name: "Crickets",          emoji: "🦗", file: "sounds/crickets.mp3"            },
  { name: "Drum Roll",         emoji: "🥁", file: "sounds/drumroll.mp3"           },
  { name: "Get Out My Swamp",  emoji: "🧅", file: "sounds/get-out.mp3"            },
];

// Button colors — each button gets a different color from this list
const colors = [
  "bg-pink-500 hover:bg-pink-400",
  "bg-orange-500 hover:bg-orange-400",
  "bg-yellow-500 hover:bg-yellow-400",
  "bg-green-500 hover:bg-green-400",
  "bg-teal-500 hover:bg-teal-400",
  "bg-cyan-500 hover:bg-cyan-400",
  "bg-blue-500 hover:bg-blue-400",
  "bg-violet-500 hover:bg-violet-400",
  "bg-fuchsia-500 hover:bg-fuchsia-400",
  "bg-rose-500 hover:bg-rose-400",
  "bg-lime-500 hover:bg-lime-400",
  "bg-amber-500 hover:bg-amber-400",
];


// ----------------------------------------------------------
// GRAB ELEMENTS FROM THE PAGE
//   document.getElementById() finds an HTML element by its id=""
// ----------------------------------------------------------
const grid        = document.getElementById("sound-grid");
const stopBtn     = document.getElementById("stop-btn");
const randomBtn   = document.getElementById("random-btn");
const nowPlaying  = document.getElementById("now-playing");
const nowPlayingName = document.getElementById("now-playing-name");
const prevBtn     = document.getElementById("prev-btn");
const nextBtn     = document.getElementById("next-btn");
const pageIndicator = document.getElementById("page-indicator");

// Pagination state
const SOUNDS_PER_PAGE = 12;
let currentPage = 0;

// We'll keep track of all Audio objects so we can stop them later
const activeSounds = [];


// ----------------------------------------------------------
// 2. DOM MANIPULATION + PAGINATION
//    renderPage() builds buttons for only the current page's sounds.
// ----------------------------------------------------------
function totalPages() {
  return Math.ceil(sounds.length / SOUNDS_PER_PAGE);
}

function renderPage(page) {
  // Clear the grid
  grid.innerHTML = "";

  // Slice out just the 12 sounds for this page
  const start = page * SOUNDS_PER_PAGE;
  const pageSounds = sounds.slice(start, start + SOUNDS_PER_PAGE);

  pageSounds.forEach((sound, index) => {
    // Create a brand-new <button> element
    const button = document.createElement("button");

    // Set the text inside the button
    button.textContent = `${sound.emoji} ${sound.name}`;

    // Pick a color based on position in the list (use global index for consistent colors)
    const colorClass = colors[(start + index) % colors.length];

    // Add Tailwind classes for styling
    button.className = [
      colorClass,
      "text-white",
      "text-lg",
      "md:text-xl",
      "font-bold",
      "py-6",
      "px-4",
      "rounded-2xl",
      "shadow-lg",
      "transition-all",
      "duration-150",
      "active:scale-95",
      "cursor-pointer",
      "w-full",
    ].join(" ");

    // --------------------------------------------------------
    // 3. EVENT LISTENER
    //    "Hey button, when someone clicks you, run this code!"
    // --------------------------------------------------------
    button.addEventListener("click", () => {
      playSound(sound, button);   // play the audio
      animateButton(button);      // make it bounce
    });

    // Add the finished button to the grid on the page
    grid.appendChild(button);
  });

  // Update the page indicator text
  pageIndicator.textContent = `Page ${page + 1} of ${totalPages()}`;

  // Disable prev/next when at the edges
  prevBtn.disabled = page === 0;
  nextBtn.disabled = page === totalPages() - 1;
}

// Prev / Next button listeners
prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage(currentPage);
    animateButton(prevBtn);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages() - 1) {
    currentPage++;
    renderPage(currentPage);
    animateButton(nextBtn);
  }
});

// Initial render
renderPage(0);


// ----------------------------------------------------------
// 4. WEB AUDIO API — Play a sound
//    new Audio(file) loads an audio file.
//    .play() starts playing it.
// ----------------------------------------------------------
function playSound(sound, button) {
  // Create a new Audio object pointed at the MP3 file
  const audio = new Audio(sound.file);

  // If the file is missing, show a friendly message instead of crashing
  audio.onerror = () => {
    nowPlayingName.textContent = `${sound.name} — file not found! Add it to the sounds/ folder.`;
    nowPlaying.classList.remove("hidden");
    nowPlaying.classList.add("slide-up");
  };

  // When the sound starts playing, update the "Now Playing" bar
  audio.onplay = () => {
    nowPlayingName.textContent = sound.name;
    nowPlaying.classList.remove("hidden");
    nowPlaying.classList.add("slide-up");
    button.classList.add("playing");   // glow effect
  };

  // When the sound finishes, remove the glow effect
  audio.onended = () => {
    button.classList.remove("playing");
    // If nothing else is playing, hide the bar
    if (activeSounds.every(a => a.paused || a.ended)) {
      nowPlaying.classList.add("hidden");
    }
  };

  audio.play();

  // Save this Audio object so the Stop button can pause it later
  activeSounds.push(audio);

  // Clean up old finished sounds so the array doesn't grow forever
  // (keep only sounds that are still playing)
  while (activeSounds.length > 20) {
    activeSounds.shift();
  }
}


// ----------------------------------------------------------
// BUTTON BOUNCE ANIMATION
//    Temporarily add the "bounce" CSS class, then remove it.
// ----------------------------------------------------------
function animateButton(button) {
  button.classList.remove("bounce");   // reset if already bouncing
  // Force the browser to notice the class was removed before re-adding
  void button.offsetWidth;
  button.classList.add("bounce");

  // Remove the class after the animation finishes (0.35s)
  setTimeout(() => button.classList.remove("bounce"), 350);
}


// ----------------------------------------------------------
// STOP ALL SOUNDS BUTTON
//    Loop through every active Audio object and pause it.
// ----------------------------------------------------------
randomBtn.addEventListener("click", () => {
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  playSound(sound, randomBtn);
  animateButton(randomBtn);
});


// ----------------------------------------------------------
// STOP ALL SOUNDS BUTTON
//    Loop through every active Audio object and pause it.
// ----------------------------------------------------------
stopBtn.addEventListener("click", () => {
  activeSounds.forEach(audio => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;   // rewind to the beginning
    }
  });

  // Remove glows from all buttons
  document.querySelectorAll("button.playing").forEach(btn => {
    btn.classList.remove("playing");
  });

  // Hide the Now Playing bar
  nowPlaying.classList.add("hidden");

  // Bounce the stop button itself for fun
  animateButton(stopBtn);
});
