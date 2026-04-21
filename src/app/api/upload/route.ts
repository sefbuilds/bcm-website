import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "nbcm-public";
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 6 * 1024 * 1024; // 6 MB

function extFromMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "bin";
}

function sanitizeFolder(folder: string): string {
  return folder
    .replace(/[^a-z0-9/-]/gi, "-")
    .replace(/\/+/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();
}

export async function POST(request: NextRequest) {
  await requireAdmin();

  const form = await request.formData();
  const file = form.get("file");
  const rawFolder = String(form.get("folder") ?? "misc");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Geen bestand ontvangen." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Alleen JPEG, PNG of WebP zijn toegestaan." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Bestand is groter dan 6 MB." },
      { status: 400 },
    );
  }

  const folder = sanitizeFolder(rawFolder) || "misc";
  const ext = extFromMime(file.type);
  const randomId = crypto.randomUUID().slice(0, 8);
  const timestamp = Date.now();
  const safeOriginal = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 40);
  const baseName = safeOriginal || "upload";
  const path = `${folder}/${timestamp}-${randomId}-${baseName}.${ext}`;

  const supabase = getSupabaseAdmin();
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, new Uint8Array(arrayBuffer), {
      contentType: file.type,
      cacheControl: "31536000, immutable",
      upsert: false,
    });

  if (error) {
    console.error("[api/upload]", error);
    return NextResponse.json(
      { error: "Upload mislukt — probeer het opnieuw." },
      { status: 500 },
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({ url: publicUrl, path });
}
