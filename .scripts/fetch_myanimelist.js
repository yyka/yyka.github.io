const fs = require('fs');

const USERNAME = "yyk";
const URL = `https://api.jikan.moe/v4/users/${USERNAME}/userupdates`;

async function fetchAnime() {
    try {
        const response = await fetch(URL);
        const result = await response.json();
        const latestAnime = result.data?.anime?.[0];

        let name = "None";
        let status = "Unknown";
        let eps_seen = "?";
        let eps_total = "?";
        let image = "";
        let url = "";

        if (latestAnime) {
            name = latestAnime.entry.title;
            status = latestAnime.status;
            eps_seen = latestAnime.episodes_seen;
            eps_total = latestAnime.episodes_total;
            image = latestAnime.entry.images.webp.large_image_url;
            url = latestAnime.entry.url;
        }

        const macroContent = `
export MYANIMELIST_NAME="${name}"
export MYANIMELIST_STATUS="${status}"
export MYANIMELIST_EPS_SEEN="${eps_seen}"
export MYANIMELIST_EPS_TOTAL="${eps_total}"
export MYANIMELIST_IMAGE="${image}"
export MYANIMELIST_URL="${url}"
`.trim();

        fs.writeFileSync('.kagami/myanimelist_macros', macroContent);
    } catch (error) {
        console.error("Failed to fetch Myanimelist data:", error);

        fs.writeFileSync('.kagami/myanimelist_macros', `
export MYANIMELIST_NAME="None"
export MYANIMELIST_STATUS="Unknown"
export MYANIMELIST_EPS_SEEN="?"
export MYANIMELIST_EPS_TOTAL="?"
export MYANIMELIST_IMAGE=""
export MYANIMELIST_URL""
`);
    }
}

fetchAnime();
