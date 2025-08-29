const username = "naufalfaisa";
const readmeContainer = document.getElementById('readme');
const avatarImg = document.getElementById('avatar');

avatarImg.src = `https://github.com/${username}.png`;

const cacheKey = "readme-cache";
const cacheTimeKey = "readme-cache-time";
const cacheTTL = 60 * 60 * 1000;

async function loadReadme() {
const now = Date.now();
const cached = localStorage.getItem(cacheKey);
const cachedTime = localStorage.getItem(cacheTimeKey);

if (cached && cachedTime && (now - cachedTime < cacheTTL)) {
    readmeContainer.innerHTML = marked.parse(cached);
    return;
}

try {
    const res = await fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`);
    const md = await res.text();
    readmeContainer.innerHTML = marked.parse(md);
    localStorage.setItem(cacheKey, md);
    localStorage.setItem(cacheTimeKey, now);
} catch (err) {
    console.error(err);
    readmeContainer.innerHTML = "⚠️ Gagal memuat README.md";
    if (cached) {
    readmeContainer.innerHTML = marked.parse(cached);
    }
}
}

loadReadme();