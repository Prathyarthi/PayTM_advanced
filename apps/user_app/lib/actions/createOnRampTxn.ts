"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const token = Math.random().toString()

    if (!userId) {
        return {
            message: "User not logged in!"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            amount,
            provider,
            token: token,
            userId,
            startTime: new Date(),
            status: "Processing"
        }
    })

    return {
        message: "OnRamp transaction created successfully"
    }
}