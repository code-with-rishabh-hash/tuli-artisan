import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CraftBadge } from "@/components/ui/CraftBadge";
import type { Artisan } from "@/types";

interface ArtisanSpotlightProps {
  artisans: Artisan[];
}

export function ArtisanSpotlight({ artisans }: ArtisanSpotlightProps) {
  const [featured, ...rest] = artisans;
  if (!featured) return null;

  const firstName = featured.name.split(" ")[0];
  const place = featured.region.split(",")[0];

  return (
    <section className="tuli-art-section">
      <Reveal>
        <div className="tuli-art-head">
          <Divider width="32px" color="var(--color-gold)" style={{ margin: "0 auto 28px" }} />
          <SectionLabel>Meet the Makers</SectionLabel>
          <h2 className="tuli-art-title">Keepers of the Craft</h2>
        </div>
      </Reveal>

      {/* Featured maker - magazine spread */}
      <Reveal>
        <div className="tuli-art-spread">
          <Link
            href={`/artisan/${featured.slug}`}
            className="tuli-art-spread-media tuli-zoom-parent"
            aria-label={`Read ${featured.name}'s story`}
          >
            <div
              className="tuli-zoom-img tuli-art-spread-img"
              style={{ backgroundImage: `url(${featured.image})` }}
            />
          </Link>
          <div>
            <span className="tuli-art-spread-craft">{featured.craft}</span>
            <p className="tuli-art-spread-quote">&ldquo;{featured.quote}&rdquo;</p>
            <p className="tuli-art-spread-bio">{featured.bio}</p>
            <div className="tuli-art-spread-meta">
              <div>
                <div className="n">{featured.yearsOfPractice}</div>
                <div className="l">Years of practice</div>
              </div>
              <div>
                <div className="n" style={{ fontSize: 26 }}>{place}</div>
                <div className="l">Where it is made</div>
              </div>
            </div>
            <Link href={`/artisan/${featured.slug}`} className="tuli-art-link">
              Read {firstName}&apos;s story &rarr;
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Remaining makers - clean grid */}
      <div className="tuli-art-grid">
        {rest.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06}>
            <Link href={`/artisan/${a.slug}`} className="tuli-art-card tuli-zoom-parent">
              <div className="tuli-art-card-media">
                <div
                  className="tuli-zoom-img tuli-art-card-img"
                  style={{ backgroundImage: `url(${a.image})` }}
                />
              </div>
              <div className="tuli-art-card-body">
                <CraftBadge craft={a.craft} />
                <h3 className="tuli-art-card-name">{a.name}</h3>
                <p className="tuli-art-card-region">
                  {a.region} &middot; {a.yearsOfPractice} years
                </p>
                <p className="tuli-art-card-bio">{a.bio}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
