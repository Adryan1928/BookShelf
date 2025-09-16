import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
    <div className="group bg-white p-6 rounded-lg shadow-sm flex items-center justify-between transition-colors duration-200 cursor-pointer">
        <div>

        <p className="text-sm font-medium text-gray-500 transition-colors duration-200 group-hover:text-red-600">
            {title}
        </p>

        <p className="text-3xl font-bold text-gray-900">
        {value}
    </p>
        </div>

        <div className="text-red-500 transition-colors duration-200 group-hover:text-red-600">
        {icon}
    </div>
</div>
    );
}