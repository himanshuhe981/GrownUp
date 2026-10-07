'use client';

import { ChartPoint } from '@/lib/types';
import { useMemo } from 'react';

interface MiniChartProps {
  data: ChartPoint[];
  height?: number;
  color?: string;
  showLabels?: boolean;
}

export function MiniChart({ data, height = 120, color = '#00D09C', showLabels = true }: MiniChartProps) {
  const { path, areaPath, viewBox, labels } = useMemo(() => {
    if (!data.length) return { path: '', areaPath: '', viewBox: '0 0 300 120', labels: [] };

    const width = 300;
    const h = height;
    const padding = 8;
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = data.map((d, i) => ({
      x: padding + (i / (data.length - 1)) * (width - 2 * padding),
      y: padding + (1 - (d.value - min) / range) * (h - 2 * padding),
    }));

    // Create smooth curve using cubic bezier
    let pathStr = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
      pathStr += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    // Area path (for gradient fill)
    const areaStr = pathStr + ` L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

    const lbls = showLabels ? data.map((d, i) => ({
      x: padding + (i / (data.length - 1)) * (width - 2 * padding),
      label: d.label,
    })) : [];

    return {
      path: pathStr,
      areaPath: areaStr,
      viewBox: `0 0 ${width} ${h}`,
      labels: lbls,
    };
  }, [data, height, showLabels]);

  if (!data.length) return null;

  const gradientId = `chart-gradient-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="w-full h-full">
      <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path 
          d={areaPath} 
          fill={`url(#${gradientId})`}
        />
        
        {/* Line */}
        <path 
          d={path} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End dot */}
        {data.length > 0 && (
          <>
            <circle 
              cx={8 + ((data.length - 1) / (data.length - 1)) * (300 - 16)} 
              cy={8 + (1 - (data[data.length - 1].value - Math.min(...data.map(d => d.value))) / (Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value)) || 1)) * (height - 16)}
              r="4" 
              fill={color}
            />
            <circle 
              cx={8 + ((data.length - 1) / (data.length - 1)) * (300 - 16)} 
              cy={8 + (1 - (data[data.length - 1].value - Math.min(...data.map(d => d.value))) / (Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value)) || 1)) * (height - 16)}
              r="8" 
              fill={color}
              opacity="0.2"
            />
          </>
        )}
      </svg>
    </div>
  );
}
