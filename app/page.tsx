"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { JSX, RefObject, useContext, useEffect, useRef, useState } from "react";
import GsapContext from "./contexts/GsapContext";
import SectionContext from "./contexts/SectionContext";
import StepContext from "./contexts/StepContext";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type TBlock = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gsapFromAnimation?: gsap.TweenVars;
    gsapToAnimations?: gsap.TweenVars[];
    enableGsapAnimations?: boolean;
    runToAnimationsImmediatly?: boolean;
};

type TStep = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

type TSectionContent = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<TStep> | React.ReactElement<TStep>[];
};

type TSection = React.HTMLAttributes<HTMLDivElement> & {
    children?:
        | React.ReactElement<TSectionContent>
        | [React.ReactElement<TSectionBg>, React.ReactElement<TSectionContent>];
};

type TSections = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<TSection> | React.ReactElement<TSection>[];
    ref: React.Ref<HTMLDivElement>;
};

type TSectionBg =
    | (React.HTMLAttributes<HTMLDivElement> & {
          type: "image";
          src: string;
      })
    | (React.VideoHTMLAttributes<HTMLVideoElement> & {
          type: "video";
          src: string;
      })
    | (React.HTMLAttributes<HTMLDivElement> & {
          type: "className";
          src?: never;
      });

const Step = ({ children, className, ...props }: TStep) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );

    useGSAP(() => {
        const timeline = gsap.timeline();

        setGsapTimeline(timeline);
    });

    return (
        <StepContext.Provider
            value={{ stepRef: stepRef, stepGsapTimeline: gsapTimeline }}
        >
            <div
                ref={stepRef}
                className={`step border-red-200 relative z-10 h-full justify-around w-full flex flex-col ${className}`}
                {...props}
            >
                {children}
            </div>
        </StepContext.Provider>
    );
};

const SectionBg = (props: TSectionBg) => {
    const { type } = props;

    if (type === "image") {
        const { src, className = "", ...rest } = props; // rest contains only valid div/html attributes
        return (
            <div className="sectionBg absolute z-0 w-full h-full">
                <img
                    src={src}
                    className={`h-full w-full object-cover ${className}`}
                    {...rest}
                />
            </div>
        );
    }

    if (type === "video") {
        const { src, className = "", ...rest } = props; // rest contains only VideoHTMLAttributes
        return (
            <div className="sectionBg absolute z-0 w-full h-full">
                <video
                    src={src}
                    className={`h-full w-full object-cover ${className}`}
                    {...rest}
                    muted
                    autoPlay
                    loop
                />
            </div>
        );
    }

    // type === "className"
    const { className = "", ...rest } = props; // rest contains div attributes
    return (
        <div className="sectionBg absolute z-0 w-full h-full">
            <div
                className={`h-full w-full object-cover ${className}`}
                {...rest}
            />
        </div>
    );
};

const SectionContent = ({ children, className, ...props }: TSectionContent) => {
    return (
        <div
            className={`sectionContent flex flex-col relative z-10 w-full h-full ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const getScrollTrigger = ({
    element,
    overrides,
}: {
    element: HTMLElement;
    overrides?: ScrollTrigger.Vars;
}): ScrollTrigger.Vars => {
    return {
        trigger: element,
        scrub: true,
        scroller: ".sectionsWrapper",
        invalidateOnRefresh: true,
        start: "top bottom",
        end: "bottom top",
        ...overrides,
    };
};

const createGsapTimelineForSection = ({
    element,
    overrides,
}: {
    element: HTMLElement;
    overrides?: ScrollTrigger.Vars;
}): gsap.core.Timeline => {
    const timeline = gsap.timeline({
        scrollTrigger: getScrollTrigger({
            element: element,
            overrides: {
                start: "top top",
                end: "bottom bottom",
                ...overrides,
            },
        }),
    });

    return timeline;
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
    const blockRef = useRef<HTMLDivElement>();
    const sectionContext = useContext(SectionContext);

    const runImmediatGsapAnimations = () => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;

        const blockTimeline = gsap.timeline();

        if (gsapFromAnimation) {
            blockTimeline.from(blockRef.current, {
                ...gsapFromAnimation,
            });
        }

        if (gsapToAnimations && runToAnimationsImmediatly) {
            gsapToAnimations.forEach((toAnimation) => {
                blockTimeline.to(blockRef.current, {
                    ...toAnimation,
                });
            });
        }
    };

    const bindDefaultScrollAnimations = (
        scrollTimeline: gsap.core.Timeline
    ) => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;

        const blockRect = blockRef.current.getBoundingClientRect();
        const sectionRect =
            sectionContext.sectionRef.current.getBoundingClientRect();

        const isOnRight =
            blockRect.left + blockRect.width > sectionRect.width / 2;

        scrollTimeline.fromTo(
            blockRef.current,
            {
                opacity: 0,
                xPercent: isOnRight ? 100 : -100,
                duration: 1,
            },
            {
                xPercent: 0,
                opacity: 1,
            }
        );
    };

    const getDefaultScrollTimeline = () => {
        const scrollTimeline = gsap.timeline({
            scrollTrigger: getScrollTrigger({
                element: blockRef.current,
                overrides: {
                    markers: true,
                },
            }),
        });

        return scrollTimeline;
    };

    useGSAP(() => {
        if (!blockRef.current) return;
        if (!sectionContext?.sectionRef.current) return;

        runImmediatGsapAnimations();

        const scrollTimeline = getDefaultScrollTimeline();

        // default
        if (!gsapFromAnimation && !gsapToAnimations) {
            bindDefaultScrollAnimations(scrollTimeline);
        }

        if (gsapToAnimations && !runToAnimationsImmediatly) {
            gsapToAnimations.forEach((toAnimation) => {
                scrollTimeline.to(blockRef.current, {
                    ...toAnimation,
                });
            });
        }
    }, [gsapFromAnimation, sectionContext]);

    return (
        <div
            ref={blockRef}
            className={`block border-2 h-fit ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const Section = ({ children, className, ...props }: TSection) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [gsapTimeline, setGsapTimeline] = useState<gsap.core.Timeline | null>(
        null
    );

    useGSAP(() => {
        if (!sectionRef.current) return;

        const timeline = createGsapTimelineForSection({
            element: sectionRef.current,
            overrides: {
                end: () => "=+" + sectionRef.current!.scrollHeight,
                pin: true, // keeps section pinned while animating
            },
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
                className={`section border-2 border-blue-200 relative w-full h-[100vh] ${className}`}
                {...props}
            >
                {children}
            </div>
        </SectionContext.Provider>
    );
};

const Sections = ({ children, ref }: TSections) => {
    return (
        <div className="sections h-fit w-full" ref={ref}>
            {children}
        </div>
    );
};

const PlaceHolderText = () => {
    return (
        <>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
        </>
    );
};

export default function Home() {
    const sectionsRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (!sectionsRef.current) return;

        ScrollSmoother.create({
            wrapper: ".sectionsWrapper",
            content: sectionsRef.current,
            smooth: 1.5,
            effects: true,
        });
    });
    return (
        <div className="sectionsWrapper">
            <Sections ref={sectionsRef}>
                <Section>
                    <SectionBg
                        type="image"
                        src="https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill"
                    />
                    <SectionContent>
                        <Step>
                            <Block
                                className="flex w-6/12 self-center"
                                gsapFromAnimation={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                gsapToAnimations={[
                                    {
                                        opacity: 0,
                                        scale: 0,
                                        duration: 1,
                                    },
                                    {
                                        opacity: 1,
                                        scale: 1,
                                        duration: 1,
                                    },
                                    {
                                        opacity: 0,
                                        scale: 3,
                                    },
                                ]}
                            >
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step>
                            <Block
                                className="absolute bottom-0 left-0 right-0 flex justify-center"
                                runToAnimationsImmediatly
                                gsapToAnimations={[
                                    {
                                        opacity: 0.5,
                                        duration: 1,
                                        repeat: -1,
                                        yoyo: true,
                                        repeatDelay: 1, // optional pause between pulses
                                    },
                                ]}
                            >
                                Scroll Down
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionBg type="className" className="bg-green-200" />
                    <SectionContent>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionBg type="className" className="bg-orange-200" />
                    <SectionContent>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionBg type="className" className="bg-purple-200" />
                    <SectionContent>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionBg type="className" className="bg-gray-200" />
                    <SectionContent>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
            </Sections>
        </div>
    );
}
