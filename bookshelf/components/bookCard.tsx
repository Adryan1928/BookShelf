import Image from "next/image";

interface BookCardProps {
    title: string;
    author: string;
    coverUrl: string;
}

export function BookCard({ title, author, coverUrl }: BookCardProps) {
    return (
        <div className="flex flex-col items-center text-center transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
    
            <div className="w-[160px] h-[240px] relative mb-4">
        <Image
            src={coverUrl}
            alt={`Capa do livro ${title}`}
            fill
            className="rounded-md shadow-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </div>

    <h3 className="font-bold text-lg text-gray-800">{title}</h3>
    <p className="text-base text-gray-500">{author}</p>
</div>
);
}