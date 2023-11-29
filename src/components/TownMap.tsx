'use client';
import * as d3 from 'd3';

import { geoPath } from 'd3-geo';
import { useEffect, useState, useRef } from 'react';
import * as topojson from 'topojson-client';
import { useStore } from './stores';
import { data } from '@/data/center';
import { BackIcon } from '@/assets/icons';
import { useSize } from 'ahooks';

export const TownMap = () => {
  const width = 600;
  const height = 600;
  const tooltip = useRef(null);
  const divRef = useRef(null);
  const size = useSize(divRef);
  const { setCountry, currentCountry, setCurrentCountry } = useStore();

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
  const projection = d3
    .geoMercator()
    .center(country.center as [number, number])
    .scale(size && size?.width < 600 ? country.scale * 0.7 : country.scale)
    .translate([width / 2, height / 4]);

  return (
    <div ref={divRef} className="relative">
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
      <svg width={size?.width} height={height}>
        <g className="countries">
          {geographies.map((d: any, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d) ?? ''}
              className="country"
              fill={randomColor()}
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
