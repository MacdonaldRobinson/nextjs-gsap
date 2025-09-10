"use client";
import SectionContext from "@/app/contexts/SectionContext";
import StepContext from "@/app/contexts/StepContext";
import { getScrollTrigger } from "@/app/page";
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

    const runImmediatGsapAnimations = () => {
        //const immediateTimeline = gsap.timeline();
        const immediateTimeline = gsap.timeline();

        const runFromAnimations = () => {
            if (gsapFromAnimation) {
                immediateTimeline.from(blockRef.current, {
                    ...gsapFromAnimation,
                });
            }
        };

        const runToAnimations = () => {
            if (runToAnimationsImmediatly) {
                if (gsapToAnimations) {
                    gsapToAnimations.forEach((toAnimation) => {
                        immediateTimeline.to(blockRef.current, {
                            ...toAnimation,
                        });
                    });
                }
            }
        };

        runFromAnimations();

        runToAnimations();

        return immediateTimeline;
    };

    useGSAP(() => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;
        if (!stepContext?.stepRef.current) return;
        if (!stepContext.gsapTimeline) return;

        const blockTimeline = gsap.timeline(); //runImmediatGsapAnimations();
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
        //blockTimeline.to(blockRef.current, { opacity: 1, duration: 2 }); // hold

        stepContext.gsapTimeline.add(blockTimeline);
    }, [sectionContext?.gsapTimeline]);

    return (
        <div
            ref={blockRef}
            className={`block border-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Block;
