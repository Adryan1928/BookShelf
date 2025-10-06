'use client';
import { useTheme } from "next-themes";
import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    const { theme } = useTheme();
    return (
    <div className={`group p-6 rounded-lg shadow-sm flex items-center justify-between transition-colors duration-200 cursor-pointer` + (theme != "light" ? " bg-neutral-900" : " bg-white")}>
        <div>

        <p className={"text-sm font-medium transition-colors duration-200 group-hover:text-red-600" + (theme != "light" ? " text-gray-300" : " text-gray-500")}>
            {title}
        </p>

        <p className={"mt-2 text-2xl font-bold " + (theme != "light" ? "text-gray-200" : "text-gray-800")}>
        {value}
    </p>
        </div>

        <div className="text-red-500 transition-colors duration-200 group-hover:text-red-600">
        {icon}
    </div>
</div>
    );
}