import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";

type TSectionProps = {
    sectionKey: string;
    sectionRef: React.RefObject<HTMLDivElement | null>;
};

export type TTopNav = {
    addSection: (sectionKey: TSectionProps) => void;
};

const TopNav = forwardRef<TTopNav>((props, ref) => {
    const topNavRef = useRef<HTMLUListElement>(null);
    const [sectionStates, setSectionStates] = useState<TSectionProps[]>([]);

    useImperativeHandle(ref, () => {
        return {
            addSection: (section: TSectionProps) => {
                setSectionStates((prev) => [...prev, section]);
            },
        };
    });

    const handleClick = (sectionProps: TSectionProps) => {
        if (!sectionProps.sectionRef.current) return;

        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        const trigger = ScrollTrigger.getById(sectionProps.sectionKey);

        if (trigger) {
            smoother.scrollTo(trigger.start, true);
        } else {
            smoother.scrollTo(sectionProps.sectionRef.current, true);
        }
    };

    gsap.fromTo(topNavRef.current, { yPercent: -100 }, { yPercent: 0 });

    return (
        <ul
            ref={topNavRef}
            className="absolute z-50 top-0 right-0 text-white flex flex-row gap-5 w-fit justify-end bg-black/50 p-3 text-2xl font-bold"
        >
            {sectionStates.map((sectionState) => {
                return (
                    <li key={sectionState.sectionKey}>
                        <a
                            className="cursor-pointer group flex flex-col items-center"
                            onClick={() => handleClick(sectionState)}
                        >
                            {sectionState.sectionKey}
                            <div className="flex w-0 h-0.5 bg-white transition-all group-hover:w-full"></div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
});
TopNav.displayName = "TopNav";

export default TopNav;
