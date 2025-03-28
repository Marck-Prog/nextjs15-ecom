'use client'

import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

// Define interface for category data matching server-side TopSalesCategory
interface CategoryData {
  _id: string
  totalSales: number
}

// Define interface for label props
interface LabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  index: number
}

export default function SalesCategoryPieChart({
  data,
}: {
  data: CategoryData[]
}) {
  const RADIAN = Math.PI / 180

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        className='text-xs'
      >
        {`${data[index]._id} ${data[index].totalSales} sales`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey='totalSales'
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill='var(--primary)' /> // Changed to CSS variable syntax
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
