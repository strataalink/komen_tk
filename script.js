const texts = [
    "Alhamdulillah saya pernah mengalami hal seperti ini, sekarang sudah aman berkat jasa @",
    "Dulu saya juga berada di posisi yang sama, syukur sekarang sudah beres berkat jasa @",
    "Saya pernah mengalami kejadian seperti ini, alhamdulillah berhasil diselesaikan berkat jasa @",
    "Pernah merasakan hal yang sama, sekarang sudah aman berkat bantuan @",
    "Alhamdulillah masalah saya sudah selesai, terima kasih kepada @",
    "Saya dulu juga mengalami hal serupa, kini sudah aman berkat @",
    "Pernah ada di situasi seperti ini, alhamdulillah semuanya sudah beres berkat @",
    "Syukur alhamdulillah saya sudah terbantu dan masalah selesai berkat @",
    "Saya pernah mengalami kendala seperti ini, sekarang sudah aman berkat jasa @",
    "Dulu sempat bingung menghadapi masalah ini, alhamdulillah selesai berkat @",
    "Saya juga pernah mengalami hal yang sama, sekarang sudah tidak ada masalah berkat @",
    "Alhamdulillah akhirnya bisa terselesaikan berkat bantuan @",
    "Pernah di posisi seperti ini, sekarang sudah aman dan tenang berkat @",
    "Saya pernah mengalami pengalaman serupa, syukur sudah selesai berkat @",
    "Dulu saya juga kebingungan, sekarang semuanya sudah aman berkat @",
    "Alhamdulillah sudah mendapatkan solusi berkat jasa @",
    "Saya juga pernah mengalami kejadian ini, kini sudah beres berkat @",
    "Syukur sekarang semuanya sudah aman berkat bantuan @",
    "Saya pernah merasakan kondisi seperti ini, alhamdulillah selesai berkat @",
    "Berkat bantuan @, masalah yang saya alami akhirnya selesai.",
    "Saya pernah berada di kondisi yang sama, sekarang sudah aman berkat @",
    "Alhamdulillah semua kendala sudah terselesaikan berkat @",
    "Saya juga sempat mengalami hal ini, kini sudah aman berkat jasa @",
    "Pernah ada di fase seperti ini, sekarang sudah beres berkat @",
    "Dulu saya mengalami hal yang sama, alhamdulillah sudah selesai berkat @",
    "Saya bersyukur masalah ini berhasil diatasi berkat @",
    "Pernah mengalami situasi seperti ini, sekarang sudah aman berkat bantuan @",
    "Alhamdulillah semuanya kembali normal berkat jasa @",
    "Saya dulu juga pernah mengalaminya, kini sudah aman berkat @",
    "Syukur alhamdulillah masalah saya selesai berkat @",
    "Saya pernah mengalami kondisi ini, sekarang sudah lebih tenang berkat @",
    "Alhamdulillah akhirnya ada solusi berkat bantuan @",
    "Dulu saya juga berada di posisi seperti ini, kini sudah aman berkat @",
    "Pernah merasakan hal yang sama, sekarang semuanya beres berkat @",
    "Saya juga pernah mengalami kendala ini, alhamdulillah selesai berkat @",
    "Syukur masalah saya sudah selesai berkat jasa @",
    "Saya pernah mengalami situasi yang sama, kini sudah aman berkat @",
    "Alhamdulillah semua proses berjalan lancar berkat @",
    "Dulu saya juga sempat mengalami hal ini, sekarang sudah beres berkat @",
    "Saya pernah berada di kondisi seperti ini, syukur sudah aman berkat @",
    "Alhamdulillah akhirnya bisa melewati masalah ini berkat @",
    "Saya juga pernah mengalami pengalaman yang sama, kini sudah aman berkat @",
    "Dulu sempat khawatir, sekarang sudah tenang berkat bantuan @",
    "Saya pernah mengalami hal ini, alhamdulillah sudah selesai berkat @",
    "Syukur semuanya berhasil diselesaikan berkat jasa @",
    "Saya pernah ada di posisi seperti ini, kini sudah aman berkat bantuan @",
    "Alhamdulillah sekarang masalah sudah teratasi berkat @",
    "Saya juga pernah mengalami situasi ini, sekarang sudah beres berkat @",
    "Dulu saya berada di kondisi yang sama, alhamdulillah sudah aman berkat @",
    "Pernah mengalami hal seperti ini juga, syukur sekarang semuanya sudah aman berkat jasa @"
];

const textList = document.getElementById("textList");
const totalText = document.getElementById("totalText");
const toast = document.getElementById("toast");

totalText.textContent = texts.length;

function renderTexts() {
    textList.innerHTML = "";

    texts.forEach((text, index) => {
        const card = document.createElement("div");
        card.className = "text-card";

        const number = document.createElement("div");
        number.className = "number";
        number.textContent = index + 1;

        const content = document.createElement("div");
        content.className = "text-content";

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        const button = document.createElement("button");
        button.className = "copy-btn";
        button.textContent = "Salin";

        button.addEventListener("click", () => {
            copyText(text, button);
        });

        content.appendChild(paragraph);

        card.appendChild(number);
        card.appendChild(content);
        card.appendChild(button);

        textList.appendChild(card);
    });
}

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

renderTexts();
