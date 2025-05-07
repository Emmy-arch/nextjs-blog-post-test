"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {

    const {getUser} = getKindeServerSession()

    const user = await getUser()
    if (!user) {
        return redirect("/api/auth/register")
    }
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const url = formData.get("url") as string;

    await prisma.blogPost.create({
        data: {
            title: title,
            content: content,
            imageUrl: url,
            authorId: user?.id,
            authorImage: user.picture ?? "",
            authorName: user.given_name ?? "",
        }
    })

    revalidatePath("/")
    
    return redirect("/dashboard");
}