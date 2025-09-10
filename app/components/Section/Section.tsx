"use client";
import SectionContext from "@/app/contexts/SectionContext";
import { getScrollTrigger } from "@/app/page";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TSectionBg } from "./SectionBg";
import { TSectionContent } from "./SectionContent";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export type TSection = React.HTMLAttributes<HTMLDivElement> & {
    pinSection?: boolean;
    children?:
        | React.ReactElement<TSectionContent>
        | [React.ReactElement<TSectionBg>, React.ReactElement<TSectionContent>];
};

const Section = ({ children, className, ...props }: TSection) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );

    useGSAP(() => {
        if (!sectionRef.current) return;

        const timeline = gsap.timeline();

        setGsapTimeline(timeline);
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + timeline.totalDuration() * 1000, // scroll distance in px
            pin: true,
            scrub: true,
            animation: timeline,
        });
    });
    return (
        <div
            ref={sectionRef}
            className={`section border-2 border-blue-200 relative w-full h-full ${className}`}
            {...props}
        >
            {sectionRef && gsapTimeline && (
                <SectionContext.Provider
                    value={{
                        sectionRef: sectionRef,
                        gsapTimeline: gsapTimeline,
                        stepsRendered: 0,
                    }}
                >
                    {children}
                </SectionContext.Provider>
            )}
        </div>
    );
};

export default Section;
