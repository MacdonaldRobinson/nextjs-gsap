"use client";
import SectionContext from "@/app/contexts/SectionContext";
import StepContext from "@/app/contexts/StepContext";
import { getScrollTrigger } from "@/app/page";
import { useGSAP } from "@gsap/react";
import { useRef, useContext, useState, useEffect } from "react";
import gsap from "gsap";

export type TStep = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Step = ({ children, className, ...props }: TStep) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const sectionContext = useContext(SectionContext);

    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );

    useGSAP(() => {
        if (!stepRef.current) return;
        if (!sectionContext?.gsapTimeline) return;
        const timeline = gsap.timeline();

        const isFirstStepInSection =
            stepRef.current.parentElement?.childNodes.entries.T;

        timeline.fromTo(
            stepRef.current,
            {
                opacity: 0,
                xPercent: -100,
            },
            {
                opacity: 1,
                xPercent: 0,
            }
        );

        timeline.to(stepRef.current, { opacity: 1, duration: 2 }); // hold

        setGsapTimeline(timeline);

        sectionContext.gsapTimeline.add(timeline);
    }, [sectionContext?.gsapTimeline]);

    return (
        <div
            ref={stepRef}
            className={`step border-red-200 z-10 justify-around w-full flex flex-col ${className}`}
            {...props}
        >
            {stepRef && gsapTimeline && (
                <StepContext.Provider
                    value={{
                        stepRef: stepRef,
                        gsapTimeline: gsapTimeline,
                        blocksRendered: 0,
                    }}
                >
                    {children}
                </StepContext.Provider>
            )}
        </div>
    );
};

export default Step;
