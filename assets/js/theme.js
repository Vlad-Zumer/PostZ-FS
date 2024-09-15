// This is more complicated than it needs to be
// all because I tried encapsulating the logic in the "Theme" class

const THEME_DARK = 0;
const THEME_LIGHT = 1;
const THEME_DEFAULT = THEME_DARK;

const THEME_TO_NAME = {
    0 : "dark",
    1 : "light"
}

class Theme {
    #_value; // the theme value

    constructor() {
        this.#value = Theme.#getStorage() ?? Theme.#getPreference();
    }

    get name()
    {
        return THEME_TO_NAME[this.#value];
    }

    toggle() {
        this.#value = 1 - this.#value;
    }
    
    static fromPreference()
    {
        let theme = new Theme();
        theme.#value = Theme.#getPreference();
        return theme;
    }
    
    get #value()
    {
        return this.#_value;
    }

    set #value(val)
    {
        this.#_value = val;
        localStorage.setItem("theme", this.#value);
    }

    static #getPreference() {
        const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const prefLight = window.matchMedia("(prefers-color-scheme: light)").matches;

        if (prefDark) {
            return THEME_DARK;
        } else if (prefLight) {
            return THEME_LIGHT;
        } else {
            return THEME_DEFAULT;
        }
    }

    static #getStorage()
    {
        const maybeInt = parseInt(localStorage.getItem("theme"));
        if (!maybeInt)
        {
            return undefined;
        }

        if (Number.isNaN(maybeInt) || !Number.isInteger(maybeInt))
        {
            return undefined;
        }

        return maybeInt;
    }
}

function setupThemeSwitcher() {
    let currentTheme = new Theme();
    let root = document.querySelector(":root");
    let button = document.querySelector('#theme-switch');

    const onPrefChanged = () => {
        root?.classList.toggle(currentTheme.name);
        currentTheme = Theme.fromPreference();
        root?.classList.toggle(currentTheme.name);
    }

    // watch for theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => { onPrefChanged(); });
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => { onPrefChanged(); });

    // init correct theme
    root.classList.toggle(currentTheme.name);

    // listen to theme change button click events
    button.addEventListener('click', (event) => {
        event.preventDefault();
        root.classList.toggle(currentTheme.name);
        currentTheme.toggle();
        root.classList.toggle(currentTheme.name);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    setupThemeSwitcher();
});
