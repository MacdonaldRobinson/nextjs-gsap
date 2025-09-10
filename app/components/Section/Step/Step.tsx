"use client";
import SectionContext from "@/app/contexts/SectionContext";
import StepContext from "@/app/contexts/StepContext";
import { useGSAP } from "@gsap/react";
import { useRef, useContext, useState } from "react";
import gsap from "gsap";
import React from "react";
import { TBlock } from "./Block/Block";

export type TStep = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<TBlock> | React.ReactElement<TBlock>[];
};

const Step = ({ children, className, ...props }: TStep) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const sectionContext = useContext(SectionContext);

    const [stepGsapTimeline, setGsapTimeline] =
        useState<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!stepRef.current) return;
        if (!sectionContext?.sectionGsapTimeline) return;

        const stepTimeline = gsap.timeline();

        stepTimeline.fromTo(
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

        setGsapTimeline(stepTimeline);
        sectionContext.registerStepTimeline(stepTimeline);
    }, [sectionContext?.sectionGsapTimeline]);

    const registerBlockTimeline = (blockTimeline: gsap.core.Timeline) => {
        if (!stepGsapTimeline) return;

        stepGsapTimeline.add(blockTimeline);
    };

    return (
        <div
            ref={stepRef}
            className={`step border-red-200 z-10 justify-around w-full h-full flex flex-col ${className}`}
            {...props}
        >
            {stepRef && stepGsapTimeline && (
                <StepContext.Provider
                    value={{
                        stepRef: stepRef,
                        stepGsapTimeline: stepGsapTimeline,
                        registerBlockTimeline: registerBlockTimeline,
                    }}
                >
                    {children}
                </StepContext.Provider>
            )}
        </div>
    );
};

export default Step;
