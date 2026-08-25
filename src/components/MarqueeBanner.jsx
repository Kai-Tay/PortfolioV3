import "./MarqueeBanner.css";

const rows = [
  { direction: "left", text: "REACT / NEXT.JS / TYPESCRIPT / POSTGRESQL / PRISMA / TRPC /" },
  { direction: "right", text: "SNOWBOARDING / PHOTOGRAPHY / HIKING / MOUNTAINS / OUTDOORS / TRAVEL /" },
  { direction: "left", text: "PYTHON / LANGCHAIN / JAVA / JAVASCRIPT / AWS / DOCKER / REDIS /" },
];

function MarqueeBanner() {
  return (
    <section className="marquee-banner" aria-label="Technical skills and interests">
      {rows.map(({ direction, text }) => (
        <div className={`marquee-banner-row marquee-banner-row-${direction}`} key={direction}>
          <div className="marquee-banner-track">
            <span>{text} {text} {text}</span>
            <span aria-hidden="true">{text} {text} {text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MarqueeBanner;
