const logo = document.getElementById("CNVMP3Logo");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const icon = themeToggle.querySelector("i");
const banner = document.querySelector(".donation-banner");

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    const isLightMode = body.classList.contains("light-mode");

    if (isLightMode) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    }
    checkLogo(isLightMode);
});

function checkLogo(isLightMode) {
    if (logo) {
        logo.src = isLightMode
            ? "https://cnvmp3.com/img/cnvmp3.png"
            : "https://cnvmp3.com/img/cnvmp3-black.png";
    }
}

function detectPlatform(url) {
    const platformIcon = document.getElementById("platform-icon");
    const validationMsg = document.getElementById("url-validation");
    const qualityControl = document.getElementById("quality-control");

    if (!url) {
        platformIcon.style.display = "none";
        validationMsg.textContent = "";
        qualityControl.classList.add("hidden");
        return;
    }

    let platform = "";
    let iconClass = "";
    let colorClass = "";
    let validationText = "";

    if (
        url.includes("youtube.com") ||
        url.includes("m.youtube.com") ||
        url.includes("youtu.be")
    ) {
        platform = "YouTube";
        iconClass = "fa-youtube";
        colorClass = "#ff0000";
        validationText = "YouTube link detected";
        qualityControl.classList.remove("hidden");
    } else if (url.includes("tiktok.com")) {
        platform = "TikTok";
        iconClass = "fa-tiktok";
        colorClass = "#ff0050";
        validationText = "TikTok link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("instagram.com")) {
        platform = "Instagram";
        iconClass = "fa-instagram";
        colorClass = "#e1306c";
        validationText = "Instagram link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
        platform = "Twitter";
        iconClass = "fa-twitter";
        colorClass = "#1da1f2";
        validationText = "Twitter link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("facebook.com")) {
        platform = "Facebook";
        iconClass = "fa-facebook";
        colorClass = "#1877f2";
        validationText = "Facebook link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("twitch.tv")) {
        platform = "Twitch";
        iconClass = "fa-twitch";
        colorClass = "#9146ff";
        validationText = "Twitch link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("reddit.com")) {
        platform = "Reddit";
        iconClass = "fa-reddit";
        colorClass = "#ff5700";
        validationText = "Reddit link detected";
        qualityControl.classList.add("hidden");
    } else if (url.includes("http") || url.includes("www.")) {
        validationText = "Platform not recognized";
        platformIcon.style.display = "none";
        validationMsg.textContent = validationText;
        validationMsg.style.color = "var(--neon-orange)";
        qualityControl.classList.add("hidden");
        return;
    } else {
        validationText = "Enter a valid URL";
        platformIcon.style.display = "none";
        validationMsg.textContent = validationText;
        validationMsg.style.color = "var(--neon-orange)";
        qualityControl.classList.add("hidden");
        return;
    }

    platformIcon.innerHTML = `<i class="fab ${iconClass}" style="color: ${colorClass}"></i>`;
    platformIcon.style.display = "block";
    validationMsg.textContent = validationText;
    validationMsg.style.color = "var(--neon-orange)";
}

function convertMedia() {
    const urlInput = document.getElementById("url").value;
    const formatSelect = document.getElementById("format");
    const bitrateSelect = document.getElementById("bitrate");
    const convertBtn = document.getElementById("convert-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = document.getElementById("progress-percent");

    if (!urlInput) {
        alert("Please enter a URL first");
        return;
    }

    let platform = "Unknown Platform";
    if (urlInput.includes("youtube.com") || urlInput.includes("youtu.be")) {
        platform = "YouTube";
    } else if (urlInput.includes("tiktok.com")) {
        platform = "TikTok";
    } else if (urlInput.includes("instagram.com")) {
        platform = "Instagram";
    } else if (
        urlInput.includes("twitter.com") ||
        urlInput.includes("x.com")
    ) {
        platform = "Twitter";
    } else if (urlInput.includes("facebook.com")) {
        platform = "Facebook";
    } else if (urlInput.includes("twitch.tv")) {
        platform = "Twitch";
    } else if (urlInput.includes("reddit.com")) {
        platform = "Reddit";
    }

    alert(
        `Conversion started!\n\nDetected platform: ${platform}\nFormat: ${formatSelect.value.toUpperCase()}\nBitrate: ${bitrateSelect.value
        }kbps`
    );

    convertBtn.disabled = true;
    convertBtn.innerHTML =
        '<span>Converting...</span><i class="fas fa-spinner fa-spin"></i>';
    progressContainer.style.display = "block";

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                convertBtn.disabled = false;
                convertBtn.innerHTML =
                    '<span>Convert Now</span><i class="fas fa-bolt"></i>';
                progressContainer.style.display = "none";
                progressBar.style.width = "0%";
                progressPercent.textContent = "0%";

                alert(
                    `Conversion complete!\n\n${platform} ${formatSelect.value.toUpperCase()} file is ready.\nQuality: ${bitrateSelect.value
                    }kbps`
                );
            }, 500);
        }
    }, 200);
}

kofiWidgetOverlay.draw("cnvmp3", {
    type: "floating-chat",
    "floating-chat.donateButton.text": "Support Us",
    "floating-chat.donateButton.background-color": "#ff5700",
});

function updateKofiProgress() {
    const progressBar = document.getElementById("kofi-progress-bar");
    const percentage = document.getElementById("kofi-percentage");

    const current = 85;
    const goal = 100;

    progressBar.style.width = `${current}%`;
    percentage.textContent = `${current}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    const currentTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark");

    if (currentTheme === "light") {
        checkLogo("light-mode");
        body.classList.add("light-mode");
        icon.classList.replace("fa-moon", "fa-sun");
    }
    updateKofiProgress();
    document.getElementById("quality-control").classList.add("hidden");
    const kofiButton = document.querySelector(".kf-chat-button");
    if (kofiButton) {
        kofiButton.classList.add("kf-chat-button");
    }
});
