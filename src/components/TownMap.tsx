'use client';
import * as d3 from 'd3';

import { geoPath } from 'd3-geo';
import { useEffect, useState, useRef, use } from 'react';
import * as topojson from 'topojson-client';
import { useStore } from './stores';
import { data } from '@/data/center';
import { BackIcon } from '@/assets/icons';
import { useSize } from 'ahooks';
import { getDistricts } from '@/services/queries/api/districts';

type Districts = {
  winner: number;
  zip: string;
  name: string;
};

export const TownMap = () => {
  const width = 600;
  const height = 600;
  const tooltip = useRef(null);
  const divRef = useRef(null);
  const size = useSize(divRef);
  const { setCountry, currentCountry, setCurrentCountry } = useStore();
  const [districts, setDistricts] = useState<Districts[]>();

  useEffect(() => {
    getDistricts(currentCountry).then((res) => {
      console.log(res[0]);
      if (!res[0].districts) return;

      setDistricts(res[0].districts);
    });
  }, []);

  const [geographies, setGeographies] = useState([]);

  const randomColor = () =>
    ['#FBBF24', '#A78BFA', '#34D399'].sort(() => Math.random() - 0.5).pop();

  useEffect(() => {
    fetch('/towns.json').then((response) => {
      if (response.status !== 200) {
        return;
      }

      response.json().then((worlddata) => {
        const geo = topojson.feature(
          worlddata,
          worlddata?.objects['towns'],
        ) as any;
        const features =
          geo.type === 'FeatureCollection'
            ? geo.features
            : geo.type === 'Feature'
              ? [geo]
              : undefined;
        if (!features) {
          throw new Error();
        }
        const town = features.filter(
          (d: any) => d.properties.COUNTYNAME === currentCountry,
        );

        setGeographies(town);
      });
    });
  }, []);
  const mouseover = function (event: any, d: any) {
    setCountry(d.properties.TOWNNAME);
    const tooltipDiv = tooltip.current;
    if (tooltipDiv) {
      d3.select(tooltipDiv).transition().duration(200).style('opacity', 0.9);
      d3.select(tooltipDiv)
        .html(d.balance)
        // TODO: some logic when the tooltip could go out from container
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px')

        .style('display', 'block')
        .text(d.properties.TOWNNAME);
    }
  };

  const mouseleave = function (d: any) {
    const tooltipDiv = tooltip.current;
    if (tooltipDiv) {
      d3.select(tooltipDiv).transition().duration(200).style('opacity', 0);
      d3.select(tooltipDiv).style('display', 'none');
    }
  };

  const country = data.find((d) => d.country === currentCountry) ?? data[0];
  let projection = d3
    .geoMercator()
    .center(country.center as [number, number])
    .scale(size && size?.width < 600 ? country.scale * 0.7 : country.scale);

  if (size && size?.width < 400) {
    projection.center([123.4, 23]).scale(5000);
  }

  const checkFillColor = (d: any) => {
    const townName = d.properties.TOWNNAME;

    const town = districts?.find((d: any) => d.name === townName) ?? null;
    if (town) {
      if (town.winner === 1) {
        return '#FBBF24';
      } else if (town.winner === 2) {
        return '#A78BFA';
      } else {
        return '#34D399';
      }
    }
    return 'gray';
  };

  return (
    <div ref={divRef}>
      <button
        className="text-cyan-600 bg-white w-10 h-10 flex justify-center items-center rounded-full"
        onClick={() => setCurrentCountry('')}
      >
        <BackIcon className="w-8 h-8" />
      </button>
      <div
        className="px-4 py-2 bg-white hidden absolute text-slate-700 z-50 rounded-full"
        ref={tooltip}
      ></div>
      <svg width={size?.width || 0} height={height || 0}>
        <g className="countries">
          {geographies.map((d: any, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d) ?? ''}
              className="country"
              fill={checkFillColor(d)}
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onMouseOver={(event) => mouseover(event, d)}
              onMouseLeave={mouseleave}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
