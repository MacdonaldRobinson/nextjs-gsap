"use client";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Section, { TSection } from "./components/Section/Section";
import Background from "./components/Section/Background";
import SectionContent from "./components/Section/SectionContent";
import Block from "./components/Section/Step/Block/Block";
import Step from "./components/Section/Step/Step";
import gsap from "gsap";
import TopNav, { TTopNav } from "./components/TopNav/TopNav";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

type TSections = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<TSection> | React.ReactElement<TSection>[];
    ref: React.Ref<HTMLDivElement>;
};

export const getScrollTrigger = ({
    element,
    overrides,
}: {
    element: HTMLElement;
    overrides?: ScrollTrigger.Vars;
}): ScrollTrigger.Vars => {
    return {
        trigger: element,
        scrub: true,
        pin: false,
        scroller: ".sectionsWrapper",
        invalidateOnRefresh: true,
        start: "top top",
        end: () => "+=" + 7000,
        pinType: "transform",
        ...overrides,
    };
};

const Sections = ({ children, className, ref }: TSections) => {
    return (
        <div className={`sections h-fit w-full ${className}`} ref={ref}>
            {children}
        </div>
    );
};

const PlaceHolderText = () => {
    return (
        <>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
        </>
    );
};

const PlaceHolderText2 = () => {
    return (
        <>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
        </>
    );
};

export default function Home() {
    const sectionsRef = useRef<HTMLDivElement>(null);
    const topNavRef = useRef<TTopNav>(null);

    useGSAP(() => {
        if (!sectionsRef.current) return;

        ScrollSmoother.create({
            wrapper: ".sectionsWrapper",
            content: sectionsRef.current,
            smooth: 1.5,
            effects: true,
            normalizeScroll: true, // important for mobile
        });
    });
    return (
        <div className="sectionsWrapper">
            <TopNav ref={topNavRef} />
            <Sections ref={sectionsRef} className="text-white">
                <Section
                    sectionKey="Home"
                    topNavRef={topNavRef}
                    pinSection={true}
                >
                    <Background
                        type="video"
                        src="https://www.pexels.com/download/video/3141206/"
                    />
                    <SectionContent>
                        <Step gsapToAnimations={[{}]}>
                            <Block>
                                <PlaceHolderText />
                            </Block>
                            <Block>
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section sectionKey="About" topNavRef={topNavRef}>
                    <Background
                        type="video"
                        src="https://www.pexels.com/download/video/7385122/"
                    />
                    <SectionContent className="flex flex-col gap-2">
                        <Step className="bg-black/50">
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step className="bg-black/50">
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step className="bg-black/50">
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section sectionKey="Contact" topNavRef={topNavRef}>
                    <Background
                        type="video"
                        src="https://www.pexels.com/download/video/3141210/"
                    />
                    <SectionContent>
                        <Step className="absolute top-0">
                            <Block>
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
            </Sections>
        </div>
    );
}
