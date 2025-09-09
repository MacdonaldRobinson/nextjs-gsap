"use client";
import { TStep } from "./Step/Step";
import gsap from "gsap";

export type TSectionContent = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<TStep> | React.ReactElement<TStep>[];
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

export default SectionContent;
