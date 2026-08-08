const STORAGE_KEY = "komentar-tk-extra-texts";

const textList = document.getElementById("textList");
const totalText = document.getElementById("totalText");
const toast = document.getElementById("toast");
const addForm = document.getElementById("addForm");
const newTextInput = document.getElementById("newTextInput");

let baseTexts = [];
let extraTexts = loadExtraTexts();
let allTexts = [];

async function init() {
    baseTexts = await loadBaseTexts();
    refreshTexts();
}

async function loadBaseTexts() {
    try {
        const response = await fetch("texts.json");

        if (!response.ok) {
            throw new Error("Gagal memuat texts.json");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Format texts.json tidak valid");
        }

        return data.filter(Boolean);
    } catch (error) {
        showToast("Buka lewat Live Server agar texts.json terbaca");
        return [];
    }
}

function loadExtraTexts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (error) {
        return [];
    }
}

function saveExtraTexts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extraTexts));
}

function refreshTexts() {
    allTexts = [...baseTexts, ...extraTexts];
    totalText.textContent = allTexts.length;
    renderTexts();
}

function renderTexts() {
    textList.innerHTML = "";

    if (allTexts.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "Belum ada teks. Tambahkan lewat form di atas atau edit file texts.json.";
        textList.appendChild(empty);
        return;
    }

    allTexts.forEach((text, index) => {
        const isExtra = index >= baseTexts.length;
        const card = document.createElement("div");
        card.className = "text-card";

        const number = document.createElement("div");
        number.className = "number";
        number.textContent = index + 1;

        const content = document.createElement("div");
        content.className = "text-content";

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "copy-btn";
        copyButton.textContent = "Salin";
        copyButton.addEventListener("click", () => {
            copyText(text, copyButton);
        });

        actions.appendChild(copyButton);

        if (isExtra) {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Hapus";
            deleteButton.addEventListener("click", () => {
                removeExtraText(index - baseTexts.length);
            });
            actions.appendChild(deleteButton);
        }

        content.appendChild(paragraph);

        card.appendChild(number);
        card.appendChild(content);
        card.appendChild(actions);

        textList.appendChild(card);
    });
}

function removeExtraText(extraIndex) {
    extraTexts.splice(extraIndex, 1);
    saveExtraTexts();
    refreshTexts();
    showToast("Teks dihapus");
}

addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const rawInput = newTextInput.value.trim();

    if (!rawInput) {
        showToast("Tulis teks dulu");
        return;
    }

    const newTexts = rawInput
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);

    if (newTexts.length === 0) {
        showToast("Teks tidak valid");
        return;
    }

    extraTexts.push(...newTexts);
    saveExtraTexts();
    newTextInput.value = "";
    refreshTexts();
    showToast(`${newTexts.length} teks berhasil ditambahkan`);
});

async function copyText(text, button) {
    try {
        await navigator.clipboard.writeText(text);

        const oldText = button.textContent;

        button.textContent = "Tersalin";
        button.classList.add("copied");

        showToast("Teks berhasil disalin");

        setTimeout(() => {
            button.textContent = oldText;
            button.classList.remove("copied");
        }, 1500);
    } catch (error) {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.select();

        document.execCommand("copy");
        textarea.remove();

        button.textContent = "Tersalin";
        button.classList.add("copied");

        showToast("Teks berhasil disalin");

        setTimeout(() => {
            button.textContent = "Salin";
            button.classList.remove("copied");
        }, 1500);
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

init();
