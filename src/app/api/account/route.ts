import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cascades remove Plays, Uploads, Accounts, Sessions, Goals, UserBadges.
  await prisma.user.delete({ where: { id: session.user.id } });

  return NextResponse.json({ success: true });
}
