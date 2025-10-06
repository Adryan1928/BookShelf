'use client';
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookCardProps {
    title: string;
    author: string;
    coverUrl: string;
    id: string;
}

export function BookCard({ title, author, coverUrl, id }: BookCardProps) {
    const router = useRouter();
    const { theme } = useTheme();

    const handleClick = () => {
        router.push(`/book/${id}`);
    }
    return (
    <div className="flex flex-col items-center text-center transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer" onClick={handleClick}>
        <div className="w-[160px] h-[240px] relative mb-4">
            <Image
                src={coverUrl}
                alt={`Capa do livro ${title}`}
                fill
                className="rounded-md shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
        <h3 className={`font-bold text-lg ${theme != "light" ? "text-gray-200" : "text-gray-800"}`}>{title}</h3>
        <p className={`text-base ${theme != "light" ? "text-gray-400" : "text-gray-500"}`}>{author}</p>
    </div>
);
}