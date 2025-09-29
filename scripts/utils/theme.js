document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.theme-slider input[type="checkbox"]');

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        console.log("Added Listener");

        toggleSwitch.addEventListener('change', switchTheme);

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            toggleSwitch.checked = currentTheme === 'dark';
        }

        console.log(toggleSwitch);
    } else {
        // DISABLED BY THE TIME BEING
        // console.warn("Toggle switch not found in the DOM");
    }
});