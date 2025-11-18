(() => {
  const themeSwitch = document.getElementById("themeSwitch");
  if (!themeSwitch) {
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const STORAGE_KEY = "sse-theme";

  const setTheme = (mode) => {
    const next = mode === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    themeSwitch.textContent = next === "dark" ? "Light mode" : "Dark mode";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // ignore storage errors
    }
  };

  const storedTheme = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  })();

  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme(prefersDark.matches ? "dark" : "light");
  }

  themeSwitch.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });

  prefersDark.addEventListener("change", (event) => {
    const hasStoredPreference = (() => {
      try {
        return Boolean(localStorage.getItem(STORAGE_KEY));
      } catch (error) {
        return false;
      }
    })();
    if (!hasStoredPreference) {
      setTheme(event.matches ? "dark" : "light");
    }
  });
})();
