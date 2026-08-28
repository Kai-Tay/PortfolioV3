import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { PHOTOGRAPHY } from "../../data/photography";
import { client, urlFor } from "../../sanity";
import "./Photography.css";

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function ArrowIcon({ direction }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={direction === "previous" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} /></svg>;
}

function Photography() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [photos, setPhotos] = useState(PHOTOGRAPHY);
  const gridRef = useRef(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "photo"]{
          _id, title, location, image, "category": album->title,
          camera, focalLength, fNumber, exposureTime
        }`,
      )
      .then((data) => {
        if (!data?.length) return;
        setPhotos(
          data
            .filter((photo) => photo.image)
            .map((photo) => ({
              id: photo._id,
              title: photo.title || "Untitled frame",
              category: photo.category || "Uncategorized",
              location: photo.location || "Unknown location",
              url: urlFor(photo.image).url(),
              camera: photo.camera || "Sony ZV-E10",
              focalLength: photo.focalLength || "N/A",
              fNumber: photo.fNumber || "N/A",
              exposureTime: photo.exposureTime || "N/A",
            })),
        );
      })
      .catch(() => {
        // The local collection remains visible while the CMS is unavailable.
      });
  }, []);

  const filters = useMemo(
    () => ["All", ...new Set(photos.map((photo) => photo.category).filter(Boolean))],
    [photos],
  );

  const visiblePhotos = useMemo(
    () => activeFilter === "All" ? photos : photos.filter((photo) => photo.category === activeFilter),
    [activeFilter, photos],
  );

  useEffect(() => {
    if (!filters.includes(activeFilter)) setActiveFilter("All");
  }, [activeFilter, filters]);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".photo-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: "power2.out", overwrite: true },
    );
  }, [visiblePhotos]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeIndex = activePhoto ? visiblePhotos.findIndex((photo) => photo.id === activePhoto.id) : -1;
  const movePhoto = (direction) => {
    if (activeIndex < 0) return;
    setActivePhoto(visiblePhotos[(activeIndex + direction + visiblePhotos.length) % visiblePhotos.length]);
  };

  return (
    <main className="photography-page">
      <section className="photography-gallery" aria-labelledby="gallery-title">
        <div className="photography-container">
          <div className="gallery-heading">
            <div>
              <p className="photography-kicker">PHOTOGRAPHY</p>
              <h2 id="gallery-title">Out of office,<br />on purpose.</h2>
            </div>
            <div className="gallery-heading-copy">
              <p>A few moments worth keeping, from cities, mountains, and everywhere in between.</p>
              <a href="https://www.instagram.com/k.ai.jpg/" target="_blank" rel="noopener noreferrer" className="instagram-btn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></svg>
                <span>@k.ai.jpg</span>
              </a>
            </div>
          </div>

          <div className="photo-filter-bar">
            <div className="photo-filter-buttons" aria-label="Filter photography collection">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={activeFilter === filter ? "is-active" : ""}
                  onClick={() => { setActiveFilter(filter); setActivePhoto(null); }}
                >
                  {filter}
                </button>
              ))}
            </div>
            <span>{visiblePhotos.length} little records</span>
          </div>

          <div className="photography-grid" ref={gridRef}>
            {visiblePhotos.map((photo, index) => (
              <article className={`photo-card photo-card-${(index % 4) + 1}`} key={photo.id}>
                <button type="button" className="photo-open-button" onClick={() => setActivePhoto(photo)} aria-label={`View ${photo.title} larger`}>
                  <img src={photo.url} alt={photo.title} className="photo-img" loading={index > 2 ? "lazy" : "eager"} />
                  <span className="photo-open-icon" aria-hidden="true">↗</span>
                </button>
                <span className="photo-category-tag">{photo.category}</span>
                <div className="photo-card-caption">
                  <div><h3>{photo.title}</h3><p>{photo.location}</p></div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activePhoto && (
        <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={() => setActivePhoto(null)} aria-label="Close image"><CloseIcon /></button>
            <img src={activePhoto.url} alt={activePhoto.title} className="lightbox-img" />
            <div className="lightbox-details">
              <div><p>{activePhoto.category}</p><h2 id="lightbox-title">{activePhoto.title}</h2><span>{activePhoto.location}</span></div>
              <div className="lightbox-controls">
                <button type="button" onClick={() => movePhoto(-1)} aria-label="Previous image"><ArrowIcon direction="previous" /></button>
                <span>{activeIndex + 1} / {visiblePhotos.length}</span>
                <button type="button" onClick={() => movePhoto(1)} aria-label="Next image"><ArrowIcon direction="next" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Photography;
