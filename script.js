/**
 * Malik Waseem Studio - Official Interactive Script
 * Video Controls, Lightbox Modal, Mobile Menu, Filter Engine & WhatsApp Builder
 */

// 1. WhatsApp Configuration
const WHATSAPP_NUMBER = "923004846929"; // 0300-4846929 in international format

// 2. Mobile Menu Drawer & Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const menuIcon = document.getElementById("menuIcon");

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle("active");
        if (menuIcon) {
            menuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            if (menuIcon) menuIcon.className = "fa-solid fa-bars";
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            if (menuIcon) menuIcon.className = "fa-solid fa-bars";
        }
    });
}

// 3. Hero Video Sound / Mute Toggle
const heroVideo = document.getElementById("heroVideo");
const heroSoundToggle = document.getElementById("heroSoundToggle");
const heroSoundIcon = document.getElementById("heroSoundIcon");
const heroSoundText = document.getElementById("heroSoundText");

if (heroSoundToggle && heroVideo) {
    heroSoundToggle.addEventListener("click", () => {
        if (heroVideo.muted) {
            // Unmute and play
            heroVideo.muted = false;
            heroVideo.volume = 1.0;
            if (heroVideo.paused) heroVideo.play();
            if (heroSoundIcon) heroSoundIcon.className = "fa-solid fa-volume-high";
            if (heroSoundText) heroSoundText.textContent = "Sound On";
            heroSoundToggle.style.animation = "none";
        } else {
            // Mute
            heroVideo.muted = true;
            if (heroSoundIcon) heroSoundIcon.className = "fa-solid fa-volume-xmark";
            if (heroSoundText) heroSoundText.textContent = "Tap for Sound";
        }
    });
}

// 4. Portfolio Category Filtering (Handles 11 Videos & Multi-Categories)
const filterBtns = document.querySelectorAll(".filter-btn");
const videoCards = document.querySelectorAll(".video-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");
        applyFilter(filterValue);
    });
});

function applyFilter(filterValue) {
    videoCards.forEach(card => {
        const categoryData = card.getAttribute("data-category") || "";
        const categories = categoryData.split(" ");

        if (filterValue === "all" || categories.includes(filterValue)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
            const vid = card.querySelector("video");
            if (vid) vid.pause();
        }
    });
}

// Function to filter portfolio when clicking category cards in #categories
function filterPortfolio(category) {
    // Find matching button
    filterBtns.forEach(b => {
        if (b.getAttribute("data-filter") === category) {
            b.classList.add("active");
        } else {
            b.classList.remove("active");
        }
    });

    applyFilter(category);

    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
}

// 5. Video Playback Management: Pause Other Videos When One Plays
const allPageVideos = document.querySelectorAll("video");
allPageVideos.forEach(video => {
    video.addEventListener("play", () => {
        allPageVideos.forEach(otherVideo => {
            if (otherVideo !== video && !otherVideo.classList.contains("mockup-video")) {
                otherVideo.pause();
            }
        });
    });
});

// 6. Video Preview Modal / Lightbox Player
const videoModal = document.getElementById("videoModal");
const modalVideoPlayer = document.getElementById("modalVideoPlayer");
const modalVideoTitle = document.getElementById("modalVideoTitle");
const modalVideoMeta = document.getElementById("modalVideoMeta");
const modalOrderBtn = document.getElementById("modalOrderBtn");
let currentModalSampleTitle = "";

function openVideoModal(videoSrc, title, meta) {
    if (!videoModal || !modalVideoPlayer) return;

    currentModalSampleTitle = title;
    if (modalVideoTitle) modalVideoTitle.textContent = title;
    if (modalVideoMeta) modalVideoMeta.textContent = meta || "Full HD 1080p";

    // Pause all other videos
    allPageVideos.forEach(v => v.pause());

    modalVideoPlayer.src = videoSrc;
    modalVideoPlayer.currentTime = 0;
    modalVideoPlayer.muted = false;

    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    modalVideoPlayer.play().catch(() => {
        // Fallback if browser blocks unmuted autoplay
        modalVideoPlayer.muted = true;
        modalVideoPlayer.play();
    });

    if (modalOrderBtn) {
        modalOrderBtn.onclick = () => {
            closeVideoModal();
            selectSample(title);
        };
    }
}

function closeVideoModal() {
    if (!videoModal || !modalVideoPlayer) return;

    modalVideoPlayer.pause();
    modalVideoPlayer.src = "";
    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("active")) {
        closeVideoModal();
    }
});

// 7. Quick Select Package / Sample -> Pre-fill Form with Smooth Scroll
function selectPackage(packageName, categoryName) {
    const packageSelect = document.getElementById("cardPackage");
    const categorySelect = document.getElementById("cardCategory");

    if (packageSelect) {
        for (let i = 0; i < packageSelect.options.length; i++) {
            if (packageSelect.options[i].value === packageName) {
                packageSelect.selectedIndex = i;
                break;
            }
        }
    }

    if (categorySelect && categoryName) {
        for (let i = 0; i < categorySelect.options.length; i++) {
            if (categorySelect.options[i].value === categoryName) {
                categorySelect.selectedIndex = i;
                break;
            }
        }
    }

    scrollToForm();
}

function selectSample(sampleTitle, categoryType, packageType) {
    const detailsField = document.getElementById("eventDetails");
    const categorySelect = document.getElementById("cardCategory");
    const packageSelect = document.getElementById("cardPackage");

    // Match category
    if (categorySelect && categoryType) {
        const catMap = {
            wedding: "Wedding / Shadi Video Invitation",
            visiting: "Digital Visiting / Business Card",
            birthday: "Birthday / Milestone Celebration",
            family: "Aqiqah / Bismillah / Family Event",
            corporate: "Corporate / Grand Opening Promo"
        };
        const targetVal = catMap[categoryType];
        if (targetVal) {
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value === targetVal) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // Match package
    if (packageSelect && packageType) {
        for (let i = 0; i < packageSelect.options.length; i++) {
            if (packageSelect.options[i].value === packageType) {
                packageSelect.selectedIndex = i;
                break;
            }
        }
    }

    // Fill details textarea
    if (detailsField) {
        detailsField.value = `Selected Style: ${sampleTitle}\n\nMy Event / Business Details:\n- Names: \n- Event Date: \n- Venue Address: \n- Special Notes: `;
        detailsField.focus();
    }

    scrollToForm();
}

function scrollToForm() {
    const orderSection = document.getElementById("order-form");
    if (orderSection) {
        orderSection.scrollIntoView({ behavior: "smooth" });
        const orderBox = orderSection.querySelector(".order-box");
        if (orderBox) {
            orderBox.style.boxShadow = "0 0 35px rgba(212, 175, 55, 0.4)";
            setTimeout(() => {
                orderBox.style.boxShadow = "";
            }, 1200);
        }
    }
}

// 8. FAQ Accordion Toggle
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
        const parentItem = btn.parentElement;
        const isCurrentlyActive = parentItem.classList.contains("active");

        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach(item => {
            item.classList.remove("active");
            const qBtn = item.querySelector(".faq-question");
            if (qBtn) qBtn.setAttribute("aria-expanded", "false");
        });

        if (!isCurrentlyActive) {
            parentItem.classList.add("active");
            btn.setAttribute("aria-expanded", "true");
        }
    });
});

// 9. Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 10. WhatsApp Order Form Validation & Submission
const whatsappForm = document.getElementById("whatsappForm");
if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("clientName");
        const detailsInput = document.getElementById("eventDetails");
        const nameError = document.getElementById("nameError");
        const detailsError = document.getElementById("detailsError");

        let isValid = true;

        const name = nameInput.value.trim();
        if (!name) {
            nameInput.closest(".form-group").classList.add("has-error");
            isValid = false;
        } else {
            nameInput.closest(".form-group").classList.remove("has-error");
        }

        const details = detailsInput.value.trim();
        if (!details) {
            detailsInput.closest(".form-group").classList.add("has-error");
            isValid = false;
        } else {
            detailsInput.closest(".form-group").classList.remove("has-error");
        }

        if (!isValid) return;

        const phone = document.getElementById("clientPhone") ? document.getElementById("clientPhone").value.trim() : "";
        const category = document.getElementById("cardCategory").value;
        const pkg = document.getElementById("cardPackage").value;
        const audio = document.getElementById("audioPreference") ? document.getElementById("audioPreference").value : "Islamic Nasheed";
        const urgency = document.getElementById("deliveryUrgency") ? document.getElementById("deliveryUrgency").value : "Standard (24–48 Hours)";

        let message = `*Assalam-o-Alaikum Malik Waseem!* 👋\n` +
            `I want to book an animated video card from *VideoInvitation.online*.\n\n` +
            `📋 *ORDER SUMMARY:*\n` +
            `👤 *Client Name:* ${name}\n`;

        if (phone) {
            message += `📞 *WhatsApp:* ${phone}\n`;
        }

        message += `🎨 *Category:* ${category}\n` +
            `⏱️ *Package:* ${pkg}\n` +
            `🎵 *Audio Choice:* ${audio}\n` +
            `⚡ *Urgency:* ${urgency}\n\n` +
            `📝 *EVENT / BUSINESS DETAILS:*\n${details}\n\n` +
            `Please share the draft timeline and payment details. Thank you!`;

        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    });

    // Clear error on input
    ["clientName", "eventDetails"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                el.closest(".form-group").classList.remove("has-error");
            });
        }
    });
}
