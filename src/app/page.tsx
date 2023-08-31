// import { ProjectInterface } from "@/common.types";
// import Script from 'next/script'
// import LoadMore from "@/components/LoadMore";
// import ProjectList from "@/components/ProjectList";
// import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
}

type Props = {
    searchParams: SearchParams
}

// type ProjectSearch = {
//     projectSearch: {
//         edges: { node: ProjectInterface }[];
//         pageInfo: {
//             hasPreviousPage: boolean;
//             hasNextPage: boolean;
//             startCursor: string;
//             endCursor: string;
//         };
//     },
// }

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams }: Props) => {
    // let { category, endcursor } = searchParams || {};
    // category = category || undefined;
    // endcursor = endcursor || undefined;
    // const data = await fetchAllProjects(category, endcursor) as ProjectSearch

    // const projectsToDisplay = data?.projectSearch?.edges || [];

    return (
        <section className="flexStart flex-col mb-16">
            Hi, there
            {/* {
                projectsToDisplay.length === 0 ? <p className="no-result-text text-center">No Data</p> : (
                    <>
                        <section className="projects-grid">
                            {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                                <ProjectList
                                    key={`${node?.id}`}
                                    id={node?.id}
                                    image={node?.image}
                                    title={node?.title}
                                    name={node?.createdBy.name}
                                    avatarUrl={node?.createdBy.avatarUrl}
                                    userId={node?.createdBy.id}
                                    tags={node?.tags}
                                />
                            ))}
                        </section>
                        <LoadMore
                            startCursor={data?.projectSearch?.pageInfo?.startCursor}
                            endCursor={data?.projectSearch?.pageInfo?.endCursor}
                            hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
                            hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
                        />
                    </>
                )
            } */}



        </section>
    )
};

export default Home;