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
        pin: true,
        scroller: ".sectionsWrapper",
        invalidateOnRefresh: true,
        start: "top top",
        end: () => "+=" + 7000,
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
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
            <Sections ref={sectionsRef} className="text-white">
                <Section>
                    <Background
                        type="image"
                        src="https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill"
                    />
                    <SectionContent>
                        <Step className="bg-green-300">
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=2&q=95&w=360&h=360&fit=fill"
                            />
                            <Block>
                                <PlaceHolderText />
                            </Block>
                            <Block>
                                <PlaceHolderText2 />
                            </Block>
                            <Block>
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <Background
                        type="image"
                        src="https://via.assets.so/game.png?id=3&q=95&w=360&h=360&fit=fill"
                    />
                    <SectionContent>
                        <Step className="bg-orange-300 absolute top-0">
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=4&q=95&w=360&h=360&fit=fill"
                            />
                            <Block>
                                <PlaceHolderText />
                            </Block>
                            <Block>
                                <PlaceHolderText2 />
                            </Block>
                            <Block>
                                <PlaceHolderText />
                            </Block>
                        </Step>
                        <Step className="bg-pink-300 absolute top-0">
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=5&q=95&w=360&h=360&fit=fill"
                            />
                            <Block>
                                <PlaceHolderText />
                            </Block>
                            <Block>
                                <PlaceHolderText2 />
                            </Block>
                            <Block>
                                <PlaceHolderText />
                            </Block>
                        </Step>
                    </SectionContent>
                </Section>
                <Section>
                    <Background
                        type="image"
                        src="https://via.assets.so/game.png?id=6&q=95&w=360&h=360&fit=fill"
                    />
                    <SectionContent>
                        <Step>
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=7&q=95&w=360&h=360&fit=fill"
                            />
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
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=8&q=95&w=360&h=360&fit=fill"
                            />
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
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=9&q=95&w=360&h=360&fit=fill"
                            />
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
                    <Background
                        type="image"
                        src="https://via.assets.so/game.png?id=10&q=95&w=360&h=360&fit=fill"
                    />
                    <SectionContent>
                        <Step>
                            <Background
                                type="image"
                                src="https://via.assets.so/game.png?id=11&q=95&w=360&h=360&fit=fill"
                            />
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
