import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { TrustMetric } from '../types';

interface TrustRadarProps {
  data: TrustMetric[];
}

export const TrustRadar: React.FC<TrustRadarProps> = ({ data }) => {
  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Trust Score"
            dataKey="A"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="#06b6d4"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
            itemStyle={{ color: '#06b6d4' }}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 right-0 text-xs text-slate-500">
        Data Source: OriginTrail DKG
      </div>
    </div>
  );
};

export const NetworkNode: React.FC = () => {
  return (
    <svg className="w-full h-full opacity-30 animate-pulse-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="40" stroke="#6366f1" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#8b5cf6" strokeWidth="1" fill="none" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="20" fill="#06b6d4" fillOpacity="0.2" />
      <circle cx="100" cy="100" r="4" fill="#fff" />
      
      <line x1="100" y1="100" x2="160" y2="60" stroke="#6366f1" strokeWidth="0.5" />
      <circle cx="160" cy="60" r="3" fill="#6366f1" />
      
      <line x1="100" y1="100" x2="40" y2="140" stroke="#6366f1" strokeWidth="0.5" />
      <circle cx="40" cy="140" r="3" fill="#6366f1" />
      
      <line x1="100" y1="100" x2="150" y2="150" stroke="#6366f1" strokeWidth="0.5" />
      <circle cx="150" cy="150" r="3" fill="#6366f1" />
    </svg>
  );
};