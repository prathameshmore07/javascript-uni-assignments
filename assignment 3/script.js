const result = document.querySelector('#result');

const skullBtn = document.querySelector('#skull-btn');
const roseBtn = document.querySelector('#died-rose-btn');
const clownBtn = document.querySelector('#clown-btn');

function showReaction(reaction) {
    if (reaction === 'skull') {
        result.textContent = "Yuhhhhh… that feeling is DEAD 💀";
    }
    else if (reaction === 'rose') {
        result.textContent = "Something beautiful but painful 🥀";
    }
    else if (reaction === 'clown') {
        result.textContent = "Feeling like a complete clown 🤡";
    }
}

skullBtn.addEventListener('click', () => showReaction('skull'));
roseBtn.addEventListener('click', () => showReaction('rose'));
clownBtn.addEventListener('click', () => showReaction('clown'));
