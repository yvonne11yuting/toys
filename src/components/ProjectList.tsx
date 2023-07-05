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
        <div className="flex rounded-2xl drop-shadow-card">
            <Link href={`/project/${id}`} className="flexCenter">
                <Image
                    src={image}
                    width={100}
                    height={90}
                    className="object-cover rounded-md"
                    alt="Project Image"
                />
            </Link>
            <div className="flex flex-col px-2 mt-3 font-semibold text-sm gap-2">
                <div className="text-lg">{title}</div>
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