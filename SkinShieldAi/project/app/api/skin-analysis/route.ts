import { NextResponse } from 'next/server';
import { generateDailyRoutine } from '@/src/lib/recommendation-engine';
import { saveSkinScan } from '@/src/lib/skin-scan-store';
import { requestYouCamSkinAnalysis } from '@/src/lib/youcam-client';

const MAX_IMAGE_DATA_URL_LENGTH = 4_000_000;
const MAX_FILE_NAME_LENGTH = 255;
const IMAGE_DATA_URL_PATTERN = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;

export async function POST(request: Request) {
  let body: { imageDataUrl?: unknown; fileName?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 });
  }

  const { imageDataUrl, fileName } = body;

  if (
    typeof imageDataUrl !== 'string' ||
    imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH ||
    !IMAGE_DATA_URL_PATTERN.test(imageDataUrl)
  ) {
    return NextResponse.json({ error: 'Please provide a valid JPEG photo.' }, { status: 400 });
  }

  if (typeof fileName !== 'string' || fileName.length === 0 || fileName.length > MAX_FILE_NAME_LENGTH) {
    return NextResponse.json({ error: 'Please provide a valid file name.' }, { status: 400 });
  }

  try {
    const analysis = await requestYouCamSkinAnalysis(imageDataUrl, fileName);
    const routine = generateDailyRoutine(analysis);

    try {
      await saveSkinScan(analysis, routine);
    } catch (saveError) {
      console.error(saveError);
    }

    return NextResponse.json({ analysis, routine });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Skin analysis is temporarily unavailable. Please try again.' },
      { status: 500 },
    );
  }
}
