import { createContext } from "react";

type TSectionContext = {
    readonly sectionRef: React.RefObject<HTMLDivElement | null>;
    readonly sectionGsapTimeline: gsap.core.Timeline | null;
    registerStepTimeline: (stepTimeline: gsap.core.Timeline) => void;
};

const SectionContext = createContext<TSectionContext | null>(null);

export default SectionContext;
