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

    if (type === "image") {
        const { src, className = "", ...rest } = props; // rest contains only valid div/html attributes
        return (
            <div className="background absolute z-0 w-full h-full">
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
            <div className="background absolute z-0 w-full h-full">
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
        <div className="background absolute z-0 w-full h-full">
            <div
                className={`h-full w-full object-cover ${className}`}
                {...rest}
            />
        </div>
    );
};

export default Background;
