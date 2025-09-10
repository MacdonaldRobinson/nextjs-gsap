"use client";
import SectionContext from "@/app/contexts/SectionContext";
import { getScrollTrigger } from "@/app/page";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TSectionBg } from "./SectionBg";
import { TSectionContent } from "./SectionContent";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export type TSection = React.HTMLAttributes<HTMLDivElement> & {
    pinSection?: boolean;
    children?:
        | React.ReactElement<TSectionContent>
        | [React.ReactElement<TSectionBg>, React.ReactElement<TSectionContent>];
};

const Section = ({ children, className, ...props }: TSection) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [sectionGsapTimeline, setGsapTimeline] =
        useState<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: getScrollTrigger({
                element: sectionRef.current,
            }),
        });

        setGsapTimeline(timeline);
    }, []);

    const registerStepTimeline = (stepTimeline: gsap.core.Timeline) => {
        if (!sectionGsapTimeline) return;

        sectionGsapTimeline.add(stepTimeline);
    };

    return (
        <div
            ref={sectionRef}
            className={`section border-2 border-blue-200 w-[100vw] h-[100vh] relative ${className}`}
            {...props}
        >
            {sectionRef && sectionGsapTimeline && (
                <SectionContext.Provider
                    value={{
                        sectionRef: sectionRef,
                        sectionGsapTimeline: sectionGsapTimeline,
                        registerStepTimeline: registerStepTimeline,
                    }}
                >
                    {children}
                </SectionContext.Provider>
            )}
        </div>
    );
};

export default Section;
