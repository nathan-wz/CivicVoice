import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import api from "../api";

interface StatusData {
    status: string;
    count: number;
}

const STATUS_COLORS: Record<string, string> = {
    OPEN: "#3b82f6", // Tailwind blue-500
    IN_PROGRESS: "#f59e0b", // Tailwind amber-500
    RESOLVED: "#10b981", // Tailwind emerald-500
    CLOSED: "#ef4444", // Tailwind red-500
    ARCHIVED: "#a855f7", // Tailwind purple-500
};

function StatusChart() {
    const [data, setData] = useState<StatusData[]>([]);

    useEffect(() => {
        api.get("/api/issues/status_summary/").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Issues by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="status" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={STATUS_COLORS[entry.status] || "#6b7280"} // fallback to gray-500
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatusChart;
