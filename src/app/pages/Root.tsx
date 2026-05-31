import { useEffect, useState, createContext, useContext } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigation } from "../components/Navigation";
import { SocialDock } from "../components/SocialDock";
import { Footer } from "../components/Footer";

const NO_FOOTER_ROUTES = ["/", "/contact"];

type Theme = "dark" | "light" | "auto";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function Root() {
  const location = useLocation();
  const showFooter = !NO_FOOTER_ROUTES.includes(location.pathname);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) ?? "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    if (theme === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Re-apply when system preference changes (auto mode)
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="w-full min-h-screen bg-[var(--cinema-black)] flex flex-col">
        <ScrollToTop />
        <Navigation />
        <SocialDock />
        <div className="flex-1">
          <Outlet />
        </div>
        {showFooter && <Footer />}
      </div>
    </ThemeContext.Provider>
  );
}