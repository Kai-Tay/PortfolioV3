import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PHOTOGRAPHY } from "../../data/photography";
import "./Photography.css";

import { client, urlFor } from "../../sanity";

function Photography() {
  const [activePhoto, setActivePhoto] = useState(null);
  const gridRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "photo"]{
          _id,
          title,
          location,
          image,
          "category": album->title,
          camera,
          lens,
          focalLength,
          aperture,
          shutter,
          iso
        }`,
      )
      .then((data) => {
        if (data && data.length > 0) {
          const mappedPhotos = data.map((photo) => ({
            id: photo._id,
            title: photo.title,
            category: photo.category || "Uncategorized",
            location: photo.location,
            url: photo.image ? urlFor(photo.image).url() : "",
            camera: photo.camera || "N/A",
            lens: photo.lens || "N/A",
            focalLength: photo.focalLength || "N/A",
            aperture: photo.aperture || "N/A",
            shutter: photo.shutter || "N/A",
            iso: photo.iso || "N/A",
          }));
          setPhotos(mappedPhotos);
        } else {
          setPhotos(PHOTOGRAPHY);
        }
      })
      .catch((err) => {
        console.error(
          "Failed to fetch from Sanity, using static fallback:",
          err,
        );
        setPhotos(PHOTOGRAPHY);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPhotos = photos.length > 0 ? photos : PHOTOGRAPHY;

  // Trigger stagger animation when the component mounts or photos change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".photo-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }
  }, [filteredPhotos]);

  return (
    <div className="photography-page">
      <div className="photography-header">
        <h1 className="photography-title">Photography</h1>
        <p className="photography-subtitle">
          Life’s too short. Do something about it. 🤪
        </p>
        <a
          href="https://www.instagram.com/k.ai.jpg/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="instagram-icon"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>@k.ai.jpg</span>
        </a>
      </div>

      {/* Dot Loader */}
      {loading && (
        <div className="dot-loader">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      )}

      {/* Photography Grid */}
      {!loading && (
        <div className="photography-grid" ref={gridRef}>
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => setActivePhoto(photo)}
            >
              <div className="photo-image-wrapper">
                <img src={photo.url} alt={photo.title} className="photo-img" />
                <div className="photo-overlay">
                  <span className="photo-category-tag">{photo.category}</span>
                  <h3 className="photo-card-title">{photo.title}</h3>
                  <span className="photo-location">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="location-icon"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {photo.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Spec Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={() => setActivePhoto(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setActivePhoto(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="lightbox-body">
              <div className="lightbox-image-container">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="lightbox-img"
                />
              </div>

              <div className="lightbox-sidebar">
                <div className="sidebar-header">
                  <span className="sidebar-category">
                    {activePhoto.category}
                  </span>
                  <h2>{activePhoto.title}</h2>
                  <p className="sidebar-location">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="location-icon"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {activePhoto.location}
                  </p>
                </div>

                <div className="camera-specs">
                  <h3>EXIF Data</h3>
                  <div className="spec-grid">
                    <div className="spec-item">
                      <span className="spec-label">Camera</span>
                      <span className="spec-value">{activePhoto.camera}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Lens</span>
                      <span className="spec-value">{activePhoto.lens}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Focal Length</span>
                      <span className="spec-value">
                        {activePhoto.focalLength}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Aperture</span>
                      <span className="spec-value">{activePhoto.aperture}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Shutter Speed</span>
                      <span className="spec-value">{activePhoto.shutter}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">ISO</span>
                      <span className="spec-value">{activePhoto.iso}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photography;
