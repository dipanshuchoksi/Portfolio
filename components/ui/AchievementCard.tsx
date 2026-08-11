import { ExternalLink } from "lucide-react";

function AchievementCard({
    topLabel,
    heading,
    year,
    description,
    certificateUrl,
}: {
    topLabel: string;
    heading: string;
    year: string;
    description: string;
    certificateUrl?: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-primary to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                    <span className="inline-block text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full mb-2">
                        {topLabel}
                    </span>
                    <h4 className="text-base font-semibold leading-snug">{heading}</h4>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                    {year}
                </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {description}
            </p>

            {certificateUrl && (
                <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                    View Certificate <ExternalLink size={12} />
                </a>
            )}
        </div>
    );
}

export default AchievementCard;