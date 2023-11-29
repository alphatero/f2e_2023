'use client';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import { useEffect, useState, useRef } from 'react';
import * as topojson from 'topojson-client';
import { useStore } from './stores';
import { useMap } from './hooks/useMap';
import { cn } from '@/utils/cn';

export const TotalMap = () => {
  const { map } = useMap();
  const data = map;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767.98;

  const { setCurrentCountry } = useStore();
  const tooltip = useRef(null);

  const [geographies, setGeographies] = useState([]);

  const windowSize = useRef({
    width: isMobile ? window.innerWidth : 600,
    height: isMobile ? window.innerHeight : 900,
  });

  // window is not defined in SSR

  useEffect(() => {
    if (isMobile) {
      windowSize.current.width = window.innerWidth;
      windowSize.current.height = window.innerHeight;
    }

    const handleResize = () => {
      windowSize.current.width = window.innerWidth;
      windowSize.current.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    fetch('/geo.json').then((response) => {
      if (response.status !== 200) {
        return;
      }

      response.json().then((worlddata) => {
        const geo = topojson.feature(
          worlddata,
          worlddata?.objects['counties'],
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

  let projection = d3.geoMercator().center([121.2, 25]).scale(11000);
  if (windowSize.current.width < 640) {
    projection.scale(6000);
  } else {
    projection.scale((11000 * windowSize.current.height) / 1100);
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
    <div className="w-full overflow-hidden bg-gray-100">
      <div
        className="px-4 py-2 bg-white hidden absolute text-slate-700 z-50 rounded-full"
        ref={tooltip}
      ></div>
      <svg
        viewBox="0 0 637 900"
        height={
          windowSize.current.width < 640 ? 600 : windowSize.current.height - 80
        }
        width={
          windowSize.current.width < 640
            ? windowSize.current.width
            : windowSize.current.width / 2.5
        }
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
