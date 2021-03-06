import React from "react";
import { graphql, Link } from "gatsby";
import { Map } from "./Map";
import { Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import { Sources } from "./Source";
import ColorHash from "color-hash";
const colorHash = new ColorHash();

const getIcon = i =>
  new L.divIcon({
    html: `${i}`,
  });

export function MapEvents({ individuals }) {
  return (
    <Map zoom={2} center={[15, 20]} style={{ minHeight: 300, height: "70vh" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {individuals.map(individual => (
        <IndividualMapEventMarkers
          key={individual.id}
          individual={individual}
        />
      ))}
    </Map>
  );
}

function IndividualMapEventMarkers({
  individual: {
    id,
    mapEvents,
    name: { fullName },
  },
}) {
  const placeEvents = mapEvents.filter(({ title, date, source, place: p }) => {
    if (!p) return false;
    const { location } = p;
    if (!location) return false;
    return true;
  });
  const colour = colorHash.hex(id);
  return (
    <>
      {placeEvents && (
        <Polyline
          color={colour}
          positions={placeEvents.map(
            ({
              place: {
                location: { lat, lng },
              },
            }) => [lat, lng]
          )}
        />
      )}
      {placeEvents.map(
        (
          {
            title,
            date,
            source,
            place: {
              place,
              location: { lat, lng },
            },
          },
          i
        ) => {
          return (
            <Marker
              key={`${title}${date}`}
              position={[lat, lng]}
              icon={getIcon(i, colour)}
            >
              <Popup>
                <Link to={`/individual/${id}`}>{fullName}</Link> - {title} -{" "}
                {place}
                {date ? `- ${date}` : ""}{" "}
                {source && <Sources sources={source} />}
              </Popup>
            </Marker>
          );
        }
      )}
    </>
  );
}
export const query = graphql`
  fragment MapIdividual on Individual {
    id
    name {
      fullName
    }
    mapEvents: allEvent {
      title
      place {
        place
        location {
          lng
          lat
        }
      }
      date(formatString: "YYYY-MM-DD")
      source {
        ...SourceInfo
      }
    }
  }
`;
