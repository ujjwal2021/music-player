const array = [{
        song: '5:55 Budi',
        singer: 'Chirag Khadka',
        source: 'budi.mp3',
        img: 'budi.jpg'
    },
    {
        song: 'Closer',
        singer: 'The Chainsmokers',
        source: 'closer.mp3',
        img: 'closer.jpg'
    },
    {
        song: 'Parelima',
        singer: '1974 AD',
        source: 'parelima.mp3',
        img: 'parelima.jpg'
    },
    {
        song: 'Timi nai Hau',
        singer: 'Sabin Rai',
        source: 'Timi_nai_hau.mp3',
        img: 'timi.jpeg'
    },
    {
        song: 'Namo Namo',
        singer: 'Amit Trivedi',
        source: 'namo_namo.mp3',
        img: 'namo.jpg'
    },
    {
        song: 'Ram saili',
        singer: 'Bipul Chhetri',
        source: 'ram_saili.mp3',
        img: 'ram.jpg'
    },
    {
        song: 'Lae dooba',
        singer: 'Sunidhi Chauhan',
        source: 'lae_dooba.mp3',
        img: 'dooba.jpg'
    }
]
let timer = 0
let index = 0
let playing_song = false

let songName = document.querySelector('#song-name')
let artist = document.querySelector('#artist')
let nextSongName = document.querySelector('#next-playing')
let image = document.querySelector('#image')

let prevBtn = document.querySelector('#prev')
let backBtn = document.querySelector('#backward')
let playPauseBtn = document.querySelector('#play-pause')
let forwardBtn = document.querySelector('#forward')
let nextBtn = document.querySelector('#next')

let slider = document.querySelector('#song-slider')
let currentVolume = document.querySelector('#volume-controls')
let muteBtn = document.querySelector('#volumeBtn')

let track = document.createElement('audio')
playPauseBtn.addEventListener('click', () => {
    play()
})
nextBtn.addEventListener('click', () => {
    playNextSong()
    play()
})
prevBtn.addEventListener('click', () => {
    playprevSong()
    play()
})

muteBtn.addEventListener('click', () => {
    muteVolume()
})
forwardBtn.addEventListener('mouseEvent', () => {
    fastFunction()
})

function load_track(index) {
    timer = setInterval(range_slider, 1000);
    track.src = array[index].source
    songName.innerHTML = array[index].song
    artist.innerHTML = array[index].singer
    image.src = array[index].img
    nextSongNameFunction(index)
        /*  nextSongName.innerHTML = array[index + 1].song*/
    track.load()

}
load_track(index)

//checks if the song is playing or not
function play() {
    if (playing_song == false) {
        playSongFunction()
    } else {
        pauseSongFunction()
    }
}

function playSongFunction() {
    track.play()
    playing_song = true
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
}

function pauseSongFunction() {
    track.pause()
    playing_song = false
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
}
//function to play next song
function playNextSong() {
    if (index < array.length - 1) {
        index++
        load_track(index)
            // playSongFunction()
    } else {
        index = 0
        load_track(index)
            // playSongFunction()

    }
}

function playprevSong() {
    if (index > 0) {
        index--
        load_track(index)
        playSongFunction()
    } else {
        index = array.length - 1
        load_track(index)
        playSongFunction()

    }
}

function nextSongNameFunction(index) {
    if (index >= array.length - 1) {
        nextSongName.innerHTML = array[0].song
    } else {
        nextSongName.innerHTML = array[index + 1].song
    }
}

function volumeChange() {
    console.log(currentVolume.value)
    track.volume = currentVolume.value / 100
}

function muteVolume() {
    track.volume = 0
    currentVolume.value = 0
}

function changeDuration() {
    slider_position = track.duration * (slider.value / 100)
    track.currentTime = slider_position
}

function range_slider() {
    let position = 0;
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }
}

function fastFunction() {
    track.playbackRate = +2
    stop()
}
// list part
/*
const leftContainer = document.querySelector('#container-left')
let listBtn = document.querySelector('#list-icon')

listBtn.addEventListener('click', () => {
        image.style.display = 'none'
        let i = 0
        for (i; i <= array.length - 1; i++) {
            let element = document.createElement('div')
            element.innerHTML = array[i].song
            element.classList.add('listItems')
            leftContainer.appendChild(element)
        }
        // addList()
    }, /* { once: true }*/ // )
/*
function addList() {
    let i = 0
    for (i; i <= array.length - 1; i++) {
        let element = document.createElement('div')
        element.innerHTML = array[i].song
        element.classList.add('listItems')
        leftContainer.appendChild(element)
    }
}*/
let shuffle = document.querySelector('#shuffle')
shuffle.addEventListener('click', () => {
    index = Math.floor(Math.random() * array.length) + 1
    load_track(index)
})