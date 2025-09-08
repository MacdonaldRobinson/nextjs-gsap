"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { JSX, RefObject, useContext, useEffect, useRef, useState } from "react";
import GsapContext from "./contexts/GsapContext";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type gsapFromTo = {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
};

type TBlock = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    gsapFromTo?: gsapFromTo;
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
    return (
        <div
            ref={stepRef}
            className={`step border-2 border-red-200 relative z-10 h-full justify-around w-full ${className}`}
            {...props}
        >
            {children}
        </div>
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
        end: "top top",
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

const Block = ({ children, className, gsapFromTo, ...props }: TBlock) => {
    const blockRef = useRef<HTMLDivElement>();
    const gsapContext = useContext(GsapContext);

    useGSAP(() => {
        if (!blockRef.current) return;
        if (!gsapContext || !gsapContext.timeline) return;

        const scrollTrigger = getScrollTrigger({
            element: blockRef.current as HTMLElement,
            overrides: {
                start: "top bottom",
                end: "top top",
                markers: true,
            },
        });

        if (gsapFromTo) {
            gsap.fromTo(blockRef.current, gsapFromTo.from, {
                ...gsapFromTo.to,
                scrollTrigger: scrollTrigger,
            });
        } else if (!gsapFromTo) {
            gsap.fromTo(
                blockRef.current,
                {
                    opacity: 0,
                    yPercent: -30,
                },
                {
                    opacity: 1,
                    yPercent: 0,
                    scrollTrigger: scrollTrigger,
                }
            );
        }
    }, [gsapContext]);

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

        const shouldPin = sectionRef.current!.scrollHeight > window.innerHeight;

        const timeline = createGsapTimelineForSection({
            element: sectionRef.current,
            overrides: {
                end: () => "+=" + sectionRef.current!.scrollHeight,
                pin: true, // keeps section pinned while animating
            },
        });

        const blocks = sectionRef.current.querySelectorAll(".block");

        blocks.forEach((block, index) => {
            const x = index % 2 === 0 ? -100 : 100;

            gsap.from(block, {
                opacity: 0,
                xPercent: x,
            });
        });
        setGsapTimeline(timeline);
    });
    return (
        <GsapContext.Provider value={{ timeline: gsapTimeline }}>
            <div
                ref={sectionRef}
                className={`section border-2 border-blue-200 relative w-full h-[100vh] ${className}`}
                {...props}
            >
                {children}
            </div>
        </GsapContext.Provider>
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
                    <SectionBg type="className" className="bg-red-200" />
                    <SectionContent>
                        <Step className="flex flex-col">
                            <Block
                                className="flex w-6/12"
                                gsapfrom={{
                                    opacity: 0,
                                }}
                            >
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionBg type="className" className="bg-green-200" />
                    <SectionContent>
                        <Step className="flex flex-col">
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
                        <Step className="flex flex-col">
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
                        <Step className="flex flex-col">
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
                        <Step className="flex flex-col">
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
