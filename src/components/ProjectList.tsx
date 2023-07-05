import Link from "next/link";
import Image from "next/image"

interface ProjectListProps {
    key: string;
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
    tags: string[];
}

const ProjectList = ({
    id,
    image,
    title,
    name,
    avatarUrl,
    userId,
    tags
}: ProjectListProps) => {
    return (
        <div className="flex items-start drop-shadow-card gap-3">
            <Link href={`/project/${id}`} className="flexCenter">
                <Image
                    src={image}
                    width={100}
                    height={90}
                    className="object-cover rounded-md"
                    alt="Project Image"
                    loading="lazy"
                />
            </Link>
            <div className="flex flex-col text-sm gap-2">
                <Link href={`/project/${id}`}>
                    <div className="text-lg font-semibold">{title}</div>
                </Link>
                <div className="flexStart gap-3">
                    <Image
                        src="/tags.svg"
                        width={13}
                        height={12}
                        alt="tags"
                    />
                    <p className="text-sm">tag: {tags?.join(', ') || ''}</p>
                </div>
                <Link href={`/profile/${userId}`}>
                    <div className="flexStart gap-2">
                        <Image
                            src={avatarUrl}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt="Profile Image"
                        />
                        <p>{name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProjectList