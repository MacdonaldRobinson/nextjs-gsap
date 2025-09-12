"use client";
import SectionContext from "@/app/contexts/SectionContext";
import StepContext from "@/app/contexts/StepContext";
import { useGSAP } from "@gsap/react";
import { useRef, useContext } from "react";
import gsap from "gsap";
import { getScrollTrigger } from "@/app/page";

export type TBlock = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gsapToAnimations?: gsap.TweenVars[];
};

const Block = ({ children, className, gsapToAnimations, ...props }: TBlock) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const sectionContext = useContext(SectionContext);
    const stepContext = useContext(StepContext);

    useGSAP(() => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;
        if (!stepContext?.stepRef.current) return;
        if (!stepContext.stepGsapTimeline) return;

        const blockTimeline = gsap.timeline();

        if (!gsapToAnimations) {
            blockTimeline.fromTo(
                blockRef.current,
                {
                    opacity: 0,
                    xPercent: -100,
                },
                {
                    opacity: 1,
                    xPercent: 0,
                }
            );
        }

        gsapToAnimations?.forEach((toAnimation) => {
            blockTimeline.to(blockRef.current, toAnimation);
        });

        stepContext.registerBlockTimeline(blockTimeline);
    }, [sectionContext?.sectionGsapTimeline]);

    return (
        <div
            ref={blockRef}
            className={`block bg-black/50 rounded-2xl text-center p-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Block;
