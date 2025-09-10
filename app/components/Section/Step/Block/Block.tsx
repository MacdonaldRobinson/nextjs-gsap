"use client";
import SectionContext from "@/app/contexts/SectionContext";
import StepContext from "@/app/contexts/StepContext";
import { useGSAP } from "@gsap/react";
import { useRef, useContext } from "react";
import gsap from "gsap";

export type TBlock = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gsapFromAnimation?: gsap.TweenVars;
    gsapToAnimations?: gsap.TweenVars[];
    enableGsapAnimations?: boolean;
    runToAnimationsImmediatly?: boolean;
};

const Block = ({
    children,
    className,
    gsapFromAnimation,
    gsapToAnimations,
    runToAnimationsImmediatly = false,
    enableGsapAnimations = true,
    ...props
}: TBlock) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const sectionContext = useContext(SectionContext);
    const stepContext = useContext(StepContext);

    useGSAP(() => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;
        if (!stepContext?.stepRef.current) return;
        if (!stepContext.stepGsapTimeline) return;

        const blockTimeline = gsap.timeline();
        blockTimeline.fromTo(
            blockRef.current,
            {
                opacity: 0,
                yPercent: -100,
            },
            {
                opacity: 1,
                yPercent: 0,
            }
        );

        stepContext.registerBlockTimeline(blockTimeline);
    }, [sectionContext?.sectionGsapTimeline]);

    return (
        <div ref={blockRef} className={`block p-2 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Block;
