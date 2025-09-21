async function loadTextFile(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Could not load ${path}`);
        const text = await response.text();

        let prettyJson = text;

        if (path.endsWith('.json')) {
            const json = JSON.parse(text);
            prettyJson = JSON.stringify(json, null, 4);
            document.getElementById('output').innerHTML = syntaxHighlight(prettyJson);
        } else {
            document.getElementById('output').textContent = prettyJson;
        }
    } catch (err) {
        document.getElementById('output').textContent = `Error: ${err.message}`;
    }
}

// yes those are reg-expressions idk what they mean
function syntaxHighlight(json) {
    json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return json.replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+\.?\d*\b)/g, match => {
        let cls = 'number';
        if (/^"/.test(match)) {
            cls = /:$/.test(match) ? 'key' : 'string';
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return `<span class="${cls}">${match}</span>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTextFile('/assets/profile.json');

    // MAIN
    const profileBtn = document.getElementById("profile-btn")
    const projectsBtn = document.getElementById("projects-btn")
    const mdBtn = document.getElementById("md-btn")

    const profileView = document.getElementById("profile-panel");
    const projectsView = document.getElementById("projects-panel");
    const mdView = document.getElementById("md-panel");


    profileBtn.addEventListener('click', () => {
        console.log("profile")

        projectsView.hidden = true
        profileView.hidden = false
        mdView.hidden = true

        profileBtn.classList.add("active")
        projectsBtn.classList.remove("active")
        mdBtn.classList.remove("active")
    })

    projectsBtn.addEventListener('click', () => {
        console.log("projects")
        profileView.hidden = true
        projectsView.hidden = false
        mdView.hidden = true

        profileBtn.classList.remove("active")
        projectsBtn.classList.add("active")
        mdBtn.classList.remove("active")
    })

    mdBtn.addEventListener('click', () => {
        console.log("projects")
        profileView.hidden = true
        projectsView.hidden = true
        mdView.hidden = false

        profileBtn.classList.remove("active")
        projectsBtn.classList.remove("active")
        mdBtn.classList.add("active")
    })
})