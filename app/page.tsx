"use client";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Section, { TSection } from "./components/Section/Section";
import SectionBg from "./components/Section/SectionBg";
import SectionContent from "./components/Section/SectionContent";
import Block from "./components/Section/Step/Block/Block";
import Step from "./components/Section/Step/Step";
import gsap from "gsap";

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
        scroller: ".sectionsWrapper",
        invalidateOnRefresh: true,
        start: "bottom bottom",
        end: () => "+=" + element.scrollHeight,
        ...overrides,
    };
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
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block
                                className="flex w-6/12 self-center"
                                gsapFromAnimation={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                gsapToAnimations={[
                                    {
                                        scale: 2,
                                        opacity: 0.5,
                                    },
                                ]}
                            >
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
                            <Block
                                className="flex w-6/12 self-center"
                                gsapFromAnimation={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                gsapToAnimations={[
                                    {
                                        scale: 2,
                                        opacity: 0.5,
                                    },
                                ]}
                            >
                                <PlaceHolderText />
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
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step>
                            <Block className="flex w-6/12">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12 self-end">
                                <PlaceHolderText />
                            </Block>
                            <Block className="flex w-6/12">
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
