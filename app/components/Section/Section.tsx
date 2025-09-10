"use client";
import SectionContext from "@/app/contexts/SectionContext";
import { getScrollTrigger } from "@/app/page";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TBackground } from "./Background";
import { TSectionContent } from "./SectionContent";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import React from "react";
import { TTopNav } from "../TopNav/TopNav";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export type TSection = React.HTMLAttributes<HTMLDivElement> & {
    topNavRef?: React.RefObject<TTopNav | null>;
    sectionKey: string;
    pinSection?: boolean;
    children?:
        | React.ReactElement<TSectionContent>
        | [
              React.ReactElement<TBackground>,
              React.ReactElement<TSectionContent>
          ];
};

const Section = ({
    children,
    className,
    sectionKey,
    topNavRef,
    ...props
}: TSection) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [sectionGsapTimeline, setGsapTimeline] =
        useState<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: getScrollTrigger({
                element: sectionRef.current,
                overrides: {
                    id: sectionKey,
                },
            }),
        });

        setGsapTimeline(timeline);
    }, []);

    useEffect(() => {
        if (!topNavRef?.current) return;
        if (!sectionRef?.current) return;

        topNavRef.current.addSection({
            sectionKey: sectionKey,
            sectionRef: sectionRef,
        });
    }, [sectionKey, topNavRef]);

    const registerStepTimeline = (stepTimeline: gsap.core.Timeline) => {
        if (!sectionGsapTimeline) return;

        sectionGsapTimeline.add(
            stepTimeline,
            "+=" + sectionGsapTimeline.getChildren().length
        );
    };

    return (
        <div
            ref={sectionRef}
            className={`section w-[100vw] h-[100vh] relative ${className}`}
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
