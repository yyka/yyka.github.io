const fs = require('fs');

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = "Yayaka_";
const URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&limit=1&api_key=${API_KEY}&format=json`;

async function fetchTrack() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        const track = data.recenttracks?.track?.[0];

        let status = "No Last.FM data";
        let song = "";
        let image = "/static/img/last_fm_missing_cover.jpg";
        let url = "";

        if (track) {
            const isPlaying = track['@attr']?.nowplaying === 'true';
            status = isPlaying ? "Now playing" : "Last played";
            song = `${track.artist['#text']} — ${track.name}`;
            image = track.image?.[3]?.['#text'] || image;
            url = track.url;
        }

        const macroContent = `
export LAST_FM_STATUS="${status}"
export LAST_FM_SONG="${song}"
export LAST_FM_IMAGE="${image}"
export LAST_FM_URL="${url}"
`.trim();

        fs.writeFileSync('.kagami/lastfm_macros', macroContent);
    } catch (error) {
        console.error("Failed to fetch Last.fm data:", error);

        fs.writeFileSync('.kagami/lastfm_macros', `
export LAST_FM_STATUS="No Last.FM data"
export LAST_FM_SONG=""
export LAST_FM_IMAGE="/static/img/last_fm_missing_cover.jpg"
export LAST_FM_URL=""
`);
    }
}

fetchTrack();
