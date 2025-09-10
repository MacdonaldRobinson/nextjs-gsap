"use client";
import gsap from "gsap";
export type TBackground =
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

const Background = (props: TBackground) => {
    const { type } = props;

    const defaultClassName = `background absolute z-0 w-full h-full top-0 left-0 z-[-1]`;

    if (type === "image") {
        const { src, className = "", ...rest } = props; // rest contains only valid div/html attributes

        return (
            <div className={`${defaultClassName}`}>
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
            <div className={`${defaultClassName}`}>
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
        <div className={`${defaultClassName}`}>
            <div
                className={`h-full w-full object-cover ${className}`}
                {...rest}
            />
        </div>
    );
};

export default Background;
