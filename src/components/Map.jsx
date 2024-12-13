import React, { useEffect, useRef, useState } from 'react';
import maplibre from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = ({ profile }) => {
  const [err,setErr] = useState(false)
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setErr(false)
    if (!profile) return;
    const lat = Number(profile.address.latitude);
    const long = Number(profile.address.longitude);

    if(isNaN(lat)|| isNaN(long)){
      return setErr(true)
    }

    if (!mapRef.current) {
      mapRef.current = new maplibre.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        center: [long, lat],
        zoom: 4,
      });

      mapRef.current.addControl(new maplibre.NavigationControl(), 'top-right');
    }

    const map = mapRef.current;

    map.flyTo({
      center: [long, lat],
      essential: true,
    });

    const markerEl = document.createElement('div');
    markerEl.style.width = '40px';
    markerEl.style.height = '40px';
    markerEl.style.borderRadius = '50%';
    markerEl.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    markerEl.style.backgroundImage = `url(${profile.image})`;
    markerEl.style.backgroundSize = 'cover';
    markerEl.style.backgroundPosition = 'top';
    markerEl.style.cursor = 'pointer';
    markerEl.classList.add('map-marker'); 

    const existingMarkers = document.querySelectorAll('.map-marker');
    existingMarkers.forEach((marker) => marker.remove());

    const popup = new maplibre.Popup({ offset: 25 })
      .setHTML(`
        <div style="text-align: center;">
          <img 
            src="${profile.image}" 
            alt="${profile.name}" 
            style="width: 50px; height: 50px; margin: auto; border-radius: 50%; margin-bottom: 10px; object-fit: cover; object-position: top;" 
          />
          <h3 style="margin: 0; font-size: 1.2em; color: #4a90e2;">${profile.name}</h3>
          <p style="margin: 0; font-size: 0.9em; color: #555;">${profile.description}</p>
        </div>
      `);

    new maplibre.Marker({ element: markerEl })
      .setLngLat([long, lat])
      .setPopup(popup) 
      .addTo(map);

  }, [profile]); 
  return (
    <div
      ref={mapContainer}
      style={{
        width: `${`${err ? `0%` : `100%`}`}`,
        height: '500px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      }}
      />
  );
};

export default Map;
