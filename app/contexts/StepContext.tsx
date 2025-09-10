import { createContext } from "react";

type TStepContext = {
    readonly stepRef: React.RefObject<HTMLDivElement | null>;
    readonly stepGsapTimeline: gsap.core.Timeline | null;
    registerBlockTimeline: (blockTimeline: gsap.core.Timeline) => void;
};

const StepContext = createContext<TStepContext | null>(null);

export default StepContext;
