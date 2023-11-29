'use client';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import { useEffect, useState, useRef } from 'react';
import * as topojson from 'topojson-client';
import { useStore } from './stores';
import { useMap } from './hooks/useMap';
import { cn } from '@/utils/cn';
import { useSize } from 'ahooks';

export const TotalMap = () => {
  const { map } = useMap();
  const data = map;

  const { setCurrentCountry } = useStore();
  const tooltip = useRef(null);
  const svgRef = useRef(null);
  const divRef = useRef(null);
  const size = useSize(divRef);

  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch('/geo.json').then((response) => {
      if (response.status !== 200) {
        return;
      }

      response.json().then((geodata) => {
        const geo = topojson.feature(
          geodata,
          geodata?.objects['counties'],
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
        setGeographies(features);
      });
    });
  }, []);

  let projection = d3.geoMercator().center([121.4, 25]).scale(8000);
  if (size && size?.width < 400) {
    projection = d3.geoMercator().center([123.4, 23]).scale(5000);
  }

  if (!data) {
    return null;
  }
  const checkFillColor = (d: any) => {
    const countyName = d.properties.COUNTYNAME;

    const county = data?.find((d: any) => d.country === countyName) ?? null;
    if (county) {
      if (county.winner === 1) {
        return '#FBBF24';
      } else if (county.winner === 2) {
        return '#A78BFA';
      } else {
        return '#34D399';
      }
    }
    return 'gray';
  };

  // 當滑鼠移動到地圖上時，顯示該縣市的名稱 運用 style centroid
  const mouseover = function (event: any, d: any) {
    const tooltipDiv = tooltip.current;
    if (tooltipDiv) {
      d3.select(tooltipDiv).transition().duration(200).style('opacity', 0.9);
      d3.select(tooltipDiv)
        .html(d.balance)
        // TODO: some logic when the tooltip could go out from container
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px')

        .style('display', 'block')
        .text(d.properties.COUNTYNAME);
    }
  };

  const mouseleave = function (d: any) {
    const tooltipDiv = tooltip.current;
    if (tooltipDiv) {
      d3.select(tooltipDiv).transition().duration(200).style('opacity', 0);
      d3.select(tooltipDiv).style('display', 'none');
    }
  };

  return (
    <div
      className="w-full overflow-hidden bg-gray-100 max-h-[80h]"
      ref={divRef}
    >
      <div
        className="px-4 py-2 bg-white hidden absolute text-slate-700 z-50 rounded-full"
        ref={tooltip}
      ></div>
      <svg
        // viewBox="0 0 637 900"
        ref={svgRef}
        height={Number(size?.width) * 1.2}
        width={Number(size?.width)}
      >
        <g className="countries">
          {geographies.map((d: any, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d) ?? ''}
              className={cn('country', checkFillColor(d))}
              fill={checkFillColor(d) ?? 'gray'}
              stroke="#FFFFFF"
              strokeWidth={0.5}
              onMouseOver={(event) => mouseover(event, d)}
              onMouseLeave={mouseleave}
              onClick={() => setCurrentCountry(d.properties.COUNTYNAME)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
