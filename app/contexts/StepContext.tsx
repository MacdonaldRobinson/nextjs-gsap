import { createContext } from "react";

type TStepContext = {
    stepRef: React.RefObject<HTMLDivElement | null>;
    gsapTimeline: gsap.core.Timeline | null;
};

const StepContext = createContext<TStepContext | null>(null);

export default StepContext;
