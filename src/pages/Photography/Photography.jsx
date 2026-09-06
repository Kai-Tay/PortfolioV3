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

function preloadPhoto(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = url;
  });
}

function PhotoOpenButton({ photo, onOpen }) {
  return (
    <button
      type="button"
      className="photo-open-button"
      onClick={onOpen}
      aria-label={`View ${photo.title} larger`}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="photo-img"
        loading="eager"
        decoding="async"
      />
      <span className="photo-open-icon" aria-hidden="true">↗</span>
    </button>
  );
}

function Photography() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [photos, setPhotos] = useState([]);
  const [isGalleryReady, setIsGalleryReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    const loadGallery = async () => {
      let galleryPhotos = PHOTOGRAPHY;
      let requestTimeout;

      try {
        const data = await Promise.race([
          client.fetch(
        `*[_type == "photo"]{
          _id, title, location, image, "category": album->title,
          camera, focalLength, fNumber, exposureTime
        }`,
          ),
          new Promise((_, reject) => {
            requestTimeout = setTimeout(() => reject(new Error("Photo request timed out")), 5000);
          }),
        ]);
        const sanityPhotos = (data || [])
          .filter((photo) => photo.image)
          .map((photo) => ({
            id: photo._id,
            title: photo.title || "Untitled frame",
            category: photo.category || "Uncategorized",
            location: photo.location || "Unknown location",
            url: urlFor(photo.image).width(1200).quality(85).url(),
            camera: photo.camera || "Sony ZV-E10",
            focalLength: photo.focalLength || "N/A",
            fNumber: photo.fNumber || "N/A",
            exposureTime: photo.exposureTime || "N/A",
          }));

        if (sanityPhotos.length) galleryPhotos = sanityPhotos;
      } catch {
        // The local collection remains visible while the CMS is unavailable.
      } finally {
        clearTimeout(requestTimeout);
      }

      if (!isActive) return;

      setLoadingProgress({ loaded: 0, total: galleryPhotos.length });
      let loaded = 0;

      await Promise.all(
        galleryPhotos.map(async (photo) => {
          await preloadPhoto(photo.url);
          loaded += 1;
          if (isActive) setLoadingProgress({ loaded, total: galleryPhotos.length });
        }),
      );

      if (!isActive) return;
      setPhotos(galleryPhotos);
      setIsGalleryReady(true);
    };

    loadGallery();

    return () => {
      isActive = false;
    };
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
    if (!isGalleryReady) return;
    const cards = gridRef.current?.querySelectorAll(".photo-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: "power2.out", overwrite: true },
    );
  }, [isGalleryReady, visiblePhotos]);

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

  const loadingPercent = loadingProgress.total
    ? (loadingProgress.loaded / loadingProgress.total) * 100
    : 0;

  return (
    <main className="photography-page" aria-busy={!isGalleryReady}>
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

          {!isGalleryReady ? (
            <div className="gallery-loader" aria-label="Loading photography gallery">
          <div className="gallery-loader-content" role="status" aria-live="polite">
            <div className="gallery-loader-camera" aria-hidden="true">
              <span className="gallery-loader-flash" />
              <span className="gallery-loader-lens"><span /></span>
            </div>
            <div className="gallery-loader-photos" aria-hidden="true">
              <span /><span /><span />
            </div>
            <p className="gallery-loader-kicker">DEVELOPING FILM</p>
            <h1>Gathering the good light...</h1>
            <div
              className="gallery-loader-progress"
              role="progressbar"
              aria-label="Photo loading progress"
              aria-valuemin="0"
              aria-valuemax={Math.max(loadingProgress.total, 1)}
              aria-valuenow={loadingProgress.loaded}
            >
              <span style={{ width: `${loadingPercent}%` }} />
            </div>
            <p className="gallery-loader-count">
              {loadingProgress.total
                ? `${loadingProgress.loaded} of ${loadingProgress.total} photos ready`
                : "Finding the frames..."}
            </p>
          </div>
            </div>
          ) : (
            <>

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
                <PhotoOpenButton photo={photo} onOpen={() => setActivePhoto(photo)} />
                <span className="photo-category-tag">{photo.category}</span>
                <div className="photo-card-caption">
                  <div><h3>{photo.title}</h3><p>{photo.location}</p></div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              </article>
            ))}
          </div>
            </>
          )}
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
