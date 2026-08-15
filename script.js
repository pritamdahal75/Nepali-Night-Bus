// ======================================
// NEPAL NIGHT BUS MUSIC PLAYER
// ======================================


const songs = [

    {
        title: "Surti Maddai - Khem Century",
         artist: "Khem Century",
        file: "songs/Surti Maddai - Khem Century.mp3",
        duration: "8:29"
    },

    {
        title: "Dandaghare Saili  - Krishna KC",
         artist: "Krishna KC",
        file: "songs/Dandaghare Saili - Krishna KC.mp3",
        duration: "8:10"
    },

    {
        title: "Trishuli Bagera - Nepali Babu Movie Song - Udit Narayan",
         artist: "Udit Narayan",
        file: "songs/Trishuli Bagera - Nepali Babu Movie Song - Udit Narayan.mp3",
        duration: "5:09"
    },

    {
        title: "Gorkha Paltan - Narayan Rayamajhi",
         artist: "Narayan Rayamajhi",
        file: "songs/Gorkha Paltan - Narayan Rayamajhi.mp3",
        duration: "5:18"
    },

    {
        title: " Kaha Paryo  Ghar - Bishwo Dong  Sashikala Moktan ",
        artist: "Bishwo Dong  Sashikala Moktan",
        file: "songs/Tamang Selo Song  Maya Vanda thulo jaat hoina   Bishwo Dong  Sashikala Moktan  Kaha Paryo  Ghar - Sagu Production House.mp3",
        duration: "11:41"
    },
       {
        title: "Sailo Ma Charghare - Bishwo Dong",
        artist: "Bishwo Dong",
        file: "songs/Sailo Ma Charghare『Official Music Video』- Bishwo Dong  Ft. Alisha Rai  Bijay Dong  Sushil Waiba - Bishwo Dong.mp3",
        duration: "11:41"
    }

];


// ======================================
// ELEMENTS
// ======================================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const nextBtn = document.getElementById("nextBtn");

const previousBtn = document.getElementById("previousBtn");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const playlist = document.getElementById("playlist");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");


// ======================================
// CURRENT SONG
// ======================================

let currentSong = 0;


// ======================================
// LOAD SONG
// ======================================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;


    duration.textContent = song.duration;

    progress.value = 0;

    displayPlaylist();

}


// ======================================
// PLAY SONG
// ======================================

function playSong() {

    audio.play();

    playBtn.textContent = "❚❚";

}


// ======================================
// PAUSE SONG
// ======================================

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

}


// ======================================
// PLAY / PAUSE BUTTON
// ======================================

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ======================================
// NEXT SONG
// ======================================

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// PREVIOUS SONG
// ======================================

previousBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// WHEN SONG ENDS
// ======================================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// UPDATE PROGRESS
// ======================================

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percent;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// ======================================
// CHANGE SONG POSITION
// ======================================

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// ======================================
// VOLUME
// ======================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ======================================
// FORMAT TIME
// ======================================

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return (
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
    );

}


// ======================================
// DISPLAY PLAYLIST
// ======================================

function displayPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const songElement = document.createElement("div");

        songElement.classList.add("song");

        if (index === currentSong) {

            songElement.classList.add("active");

        }

        songElement.innerHTML = `

            <div class="song-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div>

                <div class="song-title">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>

            <div class="song-duration">
                ${song.duration}
            </div>

        `;


        songElement.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });


        playlist.appendChild(songElement);

    });

}


// ======================================
// INITIALIZE
// ======================================

audio.volume = 0.8;

loadSong(0);

/* =========================
   BUS HORN
========================= */

/* =========================
   BUS HORN + MUSIC DUCKING
========================= */

const hornBtn = document.getElementById("hornBtn");

const hornSound = new Audio("sounds/bus-horn.mp3");

// Remember the music volume
let musicVolume = audio.volume;

// Volume while horn is playing
const hornMusicVolume = 0.20;


// Smoothly change music volume
function fadeMusicVolume(targetVolume, duration = 300) {

    const startVolume = audio.volume;

    const startTime = performance.now();

    function fade(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        audio.volume =
            startVolume +
            (targetVolume - startVolume) * progress;

        if (progress < 1) {

            requestAnimationFrame(fade);

        }

    }

    requestAnimationFrame(fade);
}


// Horn button

hornBtn.addEventListener("click", () => {

    // Save current music volume
    musicVolume = audio.volume;


    // Lower music
    fadeMusicVolume(hornMusicVolume, 200);


    // Restart horn
    hornSound.currentTime = 0;

    hornSound.play();


    // Button animation
    hornBtn.classList.add("honking");


    // When horn finishes
    hornSound.onended = () => {

        // Restore music volume
        fadeMusicVolume(musicVolume, 600);

        hornBtn.classList.remove("honking");

    };

});