import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Root } from "./pages/Root";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const SelectedWork = lazy(() => import("./pages/SelectedWork").then((m) => ({ default: m.SelectedWork })));
const EngineeringPrinciples = lazy(() => import("./pages/EngineeringPrinciples").then((m) => ({ default: m.EngineeringPrinciples })));
const Writing = lazy(() => import("./pages/Writing").then((m) => ({ default: m.Writing })));
const Timeline = lazy(() => import("./pages/Timeline").then((m) => ({ default: m.Timeline })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));
const ComingSoon = lazy(() => import("./pages/ComingSoon").then((m) => ({ default: m.ComingSoon })));

function PageFallback() {
  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] flex items-center justify-center">
      <div className="w-px h-12 bg-[var(--cinema-accent)] opacity-30 animate-pulse" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: <Suspense fallback={<PageFallback />}><Home /></Suspense> },
      { path: "work", element: <Suspense fallback={<PageFallback />}><SelectedWork /></Suspense> },
      { path: "principles", element: <Suspense fallback={<PageFallback />}><EngineeringPrinciples /></Suspense> },
      { path: "writing", element: <Suspense fallback={<PageFallback />}><Writing /></Suspense> },
      { path: "timeline", element: <Suspense fallback={<PageFallback />}><Timeline /></Suspense> },
      { path: "about", element: <Suspense fallback={<PageFallback />}><About /></Suspense> },
      { path: "contact", element: <Suspense fallback={<PageFallback />}><Contact /></Suspense> },
      { path: "coming-soon", element: <Suspense fallback={<PageFallback />}><ComingSoon /></Suspense> },
      { path: "*", element: <Suspense fallback={<PageFallback />}><NotFound /></Suspense> },
    ],
  },
]);
