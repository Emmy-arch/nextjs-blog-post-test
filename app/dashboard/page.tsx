import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogpstCard";

async function getBlogPosts(userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 9000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DashboardRoute() {
  // Get user ID
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getBlogPosts(user?.id as string);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-meduim">Your Blog Articles</h2>

        <Link href="/dashboard/create" className={buttonVariants()}>
          Create
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
