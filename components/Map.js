import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og";

const MapContainer = tw.div`
  flex-1 md:flex-[2_2_0%] border border-gray-600  rounded-xl w-full h-full
`;

const Map = ({ pickupCoordinates, dropoffCoordinates, Package, formType }) => {
  const mapContainerRef = useRef(null);
  const packageDistance = Package === "10|100" ? Package.slice(3) : Package.slice(2);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og"; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [72.841310, 19.231320],
      zoom: 10,
    });

    const addToMap = (coordinates, color) => {
      new mapboxgl.Marker({ color })
        .setLngLat(coordinates)
        .addTo(map);
    };

    const drawCircle = (center, radius) => {
      map.addLayer({
        id: 'circle',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: center,
            },
          },
        },
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, (radius * 1000) / 2], // Convert km to meters
            ],
            base: 2,
          },
          'circle-color': 'blue',
          'circle-opacity': 0.2,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'blue',
        },
      });
    };

    const calculateDistance = (coord1, coord2) => {
      const [lon1, lat1] = coord1;
      const [lon2, lat2] = coord2;

      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2); // Return the distance rounded to 2 decimal places
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const loadMap = () => {
      const marker = new mapboxgl.Marker({ color: '#0080FF'}).setLngLat([72.841310, 19.231320])    
      .setPopup(new mapboxgl.Popup({ closeButton: false })
      .setHTML(`<h3 style="font-size: 18px">CAR RENTAL</h3>`));

      if ((formType === "OutStation" || formType === "Airport") &&
        pickupCoordinates[0] !== 0 && pickupCoordinates[1] !== 0 &&
        dropoffCoordinates[0] !== 0 && dropoffCoordinates[1] !== 0
      ) {
        console.log(pickupCoordinates, dropoffCoordinates);
        addToMap(pickupCoordinates, 'red');
        addToMap(dropoffCoordinates, 'green');
        map.fitBounds([pickupCoordinates, dropoffCoordinates], {
          padding: 80,
        });

        const distance = calculateDistance(pickupCoordinates, dropoffCoordinates);
        marker.remove()
        console.log(distance);
      } else if (formType === "Local Transport" &&
        packageDistance !== '' &&
        pickupCoordinates[0] !== 0 && pickupCoordinates[1] !== 0
      ) {
        console.log("ggs");
        addToMap(pickupCoordinates, 'red');
        drawCircle(pickupCoordinates, parseInt(packageDistance));
        map.fitBounds([pickupCoordinates, pickupCoordinates], {
          maxZoom: 12,
        });
        marker.remove()
      }
      else{
        marker.addTo(map);
      }
    };

    map.on('load', loadMap);

    return () => {
      map.off('load', loadMap);
      map.remove();
    };
  }, [pickupCoordinates, dropoffCoordinates, Package, formType, packageDistance]);

  return <MapContainer ref={mapContainerRef} id="map" />;
};

export default Map;