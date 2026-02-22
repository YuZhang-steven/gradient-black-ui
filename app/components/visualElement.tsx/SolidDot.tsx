import { classNameMerger } from "../../lib/classNameMerger";

type BlackDotProps = React.HTMLAttributes<HTMLDivElement> & {
    id?: string;
    size?: number;
    ref?: React.Ref<HTMLDivElement>;
}

export default function SolidDot({
    id = "black-dot",
    size = 12,
    className,
    style,
    ref,
    ...props
}: BlackDotProps) {
    const clx = classNameMerger(
        "rounded-full pointer-events-none bg-black",
        className
    )
    return (
        <div
            ref={ref}
            className={clx}
            style={{
                width: size,
                height: size,
                ...style
            }}
            {...props}
            id={id}

        />
    )
}
