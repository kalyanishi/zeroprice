type MarqueeProps = {
    className?: string;
    variant?: "hero" | "timeline";
};

export default function Marquee({
    className = "",
    variant = "hero",
}: MarqueeProps) {
    const isHeroVariant = variant === "hero";

    const containerClassName = [
        isHeroVariant
            ? "overflow-hidden bg-[#1D9770] py-3 transition-all duration-300 hover:bg-[#178760]"
            : "overflow-hidden rounded-full border border-[#1D9770]/30 bg-[#1D9770]/5 py-2.5",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const itemClassName = isHeroVariant
        ? "inline-flex items-center gap-3 px-8 text-sm font-semibold text-white md:text-base"
        : "inline-flex items-center gap-3 px-8 text-sm font-medium text-[#1D9770]";

    const dotClassName = isHeroVariant
        ? "inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F29356]"
        : "inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1D9770]";

    const deadlineClassName = isHeroVariant
        ? "font-bold text-[#F29356] underline underline-offset-2"
        : "font-semibold";

    return (
        <div className={containerClassName}>
            <div className="flex whitespace-nowrap animate-[marquee_22s_linear_infinite]">
                {[0, 1, 2].map((index) => (
                    <span key={index} className={itemClassName}>
                        <span className={dotClassName} />
                        Early Submissions by <span className={deadlineClassName}>31 May 2026</span> will receive feedback.
                        Applications submitted later will proceed directly for evaluation.
                    </span>
                ))}
            </div>
        </div>
    );
}
