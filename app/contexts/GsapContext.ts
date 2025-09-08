import { createContext } from "react";

type TGsapContext = {
    timeline: gsap.core.Timeline | null
}

const GsapContext = createContext<TGsapContext | null>(null)

export default GsapContext;