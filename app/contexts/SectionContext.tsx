import { createContext } from "react";

type TSectionContext = {
    sectionRef: React.RefObject<HTMLDivElement | null>;
    sectionGsapTimeline: gsap.core.Timeline | null;
};

const SectionContext = createContext<TSectionContext | null>(null);

export default SectionContext;
