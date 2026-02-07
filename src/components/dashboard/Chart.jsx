import React from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

// ─── Chart Components for Dashboards ───

export function VisitorTrendChart({ data, dateRange }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1A7A6D" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1A7A6D" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E0" />
        <XAxis 
          dataKey="date" 
          stroke="#6B7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6B7280"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E8E8E0',
            borderRadius: '8px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="visitors" 
          stroke="#1A7A6D" 
          fillOpacity={1} 
          fill="url(#colorVisitors)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrafficSourcesChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
        No data available
      </div>
    )
  }

  const COLORS = ['#1A7A6D', '#2EC4B6', '#D4A843', '#E8756D', '#6B7280']

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percentage }) => `${name}: ${percentage}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function RevenueChart({ data, color = '#0066FF' }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A8A9A' }}>
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3A" />
        <XAxis 
          dataKey="date" 
          stroke="#8A8A9A"
          style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
        />
        <YAxis 
          stroke="#8A8A9A"
          style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a1a24', 
            border: '1px solid #2A2A3A',
            borderRadius: '8px',
            color: '#FFFFFF'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function VitalityRing({ score, color = '#0066FF', size = 120 }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2A2A3A"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '32px',
          fontWeight: 600,
          color: '#FFFFFF'
        }}>
          {score}
        </div>
      </div>
    </div>
  )
}
