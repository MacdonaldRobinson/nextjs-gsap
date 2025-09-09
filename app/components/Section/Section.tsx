"use client";
import SectionContext from "@/app/contexts/SectionContext";
import { getScrollTrigger } from "@/app/page";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TSectionBg } from "./SectionBg";
import { TSectionContent } from "./SectionContent";
import gsap from "gsap";

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

    useEffect(() => {
        console.log(gsapTimeline?.totalDuration());
    }, [gsapTimeline]);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: getScrollTrigger({
                element: sectionRef.current,
                overrides: {},
            }),
        });

        setGsapTimeline(timeline);
    });
    return (
        <SectionContext.Provider
            value={{
                sectionRef: sectionRef,
                sectionGsapTimeline: gsapTimeline,
            }}
        >
            <div
                ref={sectionRef}
                className={`section border-2 border-blue-200 relative w-full h-full ${className}`}
                {...props}
            >
                {children}
            </div>
        </SectionContext.Provider>
    );
};

export default Section;
