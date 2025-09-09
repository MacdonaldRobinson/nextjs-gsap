import { createContext } from "react";

type TSectionContext = {
    sectionRef: React.RefObject<HTMLDivElement | null>;
    gsapTimeline: gsap.core.Timeline | null;
};

const SectionContext = createContext<TSectionContext | null>(null);

export default SectionContext;
