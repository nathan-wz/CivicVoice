import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend,
} from "recharts";
import api from "../api";

interface StatusData {
    status: string;
    count: number;
}

const STATUS_COLORS: Record<string, string> = {
    OPEN: "#3b82f6",
    IN_PROGRESS: "#f59e0b",
    RESOLVED: "#10b981",
    CLOSED: "#ef4444",
    ARCHIVED: "#a855f7",
};

const renderLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
}: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#1f2937"
            fontSize={12}
            textAnchor="middle"
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function StatusChart() {
    const [data, setData] = useState<StatusData[]>([]);

    useEffect(() => {
        api.get("/api/issues/status_summary/").then((res) => {
            setData(res.data);
        });
    }, []);

    const chartData = data.map((d) => ({
        ...d,
        name: d.status,
    }));

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={renderLabel}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        STATUS_COLORS[entry.status] || "#6b7280"
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => `${value} issues`}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StatusChart;
