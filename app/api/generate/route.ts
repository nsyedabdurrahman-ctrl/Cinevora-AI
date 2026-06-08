import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
 const {
  style,
  productName,
  brandName,
  productDescription,
  targetAudience,
} = await req.json();

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
You are Cinevora AI.

Product Name: ${productName}
Brand Name: ${brandName}
Product Description: ${productDescription}
Target Audience: ${targetAudience}
Style: ${style}

Return ONLY valid JSON.
Create exactly 5 cinematic advertisement scenes based on the provided product name, brand name, product description, target audience, and style.

The scenes must specifically advertise the product.

The target audience should strongly influence:

* environment
* characters
* clothing
* mood
* camera work

The product description must be reflected in every scene.

Mention the brand naturally throughout the campaign.

Each scene must contain:

* scene
* title
* duration
* camera
* lighting
* action
* voiceover
* music
* prompt

The prompt must be highly cinematic and detailed.

Include:

* subject
* environment
* camera movement
* lighting
* mood
* color grading
* realism
* commercial advertising style

Make prompts suitable for Flow, Kling, Veo, Runway, Hailuo, and other AI video generators.

Return ONLY valid JSON.

Format:

{
  "project_name": "Campaign",
  "scenes": [
   {
  "scene": 1,
  "title": "",
  "duration": "8s",
  "camera": "",
  "lighting": "",
  "action": "",
  "voiceover": "",
  "music": "",
  "prompt": ""
}
  ]
}

The prompts must be highly cinematic and detailed.

Include:
- subject
- environment
- camera movement
- lighting
- mood
- color grading
- realism
- commercial advertising style

Do not write explanations.
Do not use markdown.
Return JSON only.
`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate" },
      { status: 500 }
    );
  }
}