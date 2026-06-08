"use client";

import { useState } from "react";

export default function Home() {
  const [scenes, setScenes] = useState<any[]>([]);
  const [productPreview, setProductPreview] = useState("");
  const [modelPreview, setModelPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("Luxury");
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const generateScenes = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style,
          productName,
          brandName,
          productDescription,
          targetAudience,
        }),
      });
      const data = await response.json();

      setResult(data.result);

      let parsedScenes: any[] = [];
      try {
        const parsed = JSON.parse(data.result);
        parsedScenes = parsed.scenes || [];
        setScenes(parsedScenes);
      } catch (err) {
        console.error(err);
      }

      const project = {
        date: new Date().toLocaleString(),
        productName,
        brandName,
        scenes: parsedScenes,
      };

      const updatedHistory = [project, ...history];
      setHistory(updatedHistory);

      localStorage.setItem(
        "cinevora-history",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(error);
      setResult("Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(result);
    alert("JSON copied successfully!");
  } catch (error) {
    alert("Failed to copy JSON");
  }
}; 
const downloadJson = () => {

  const blob = new Blob([result], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "campaign.json";
  a.click();+

  URL.revokeObjectURL(url);
};
const downloadPrompts = () => {
  const text = scenes
    .map(
      (scene) =>
        `Scene ${scene.scene}: ${scene.title}\n\n${scene.prompt}`
    )
    .join("\n\n-------------------\n\n");

  const blob = new Blob([text], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cinevora-prompts.txt";
  a.click();

  URL.revokeObjectURL(url);
};
return (
   <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-6xl font-bold text-center mb-4">
          Cinevora AI
        </h1>

        <p className="text-center text-gray-400 text-xl mb-12">
          Transform Product Photos Into Cinematic Video Ads
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl mb-4">Product Image</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProductPreview(URL.createObjectURL(file));
                }
              }}
            />

            {productPreview && (
              <img
                src={productPreview}
                alt="product"
                className="mt-4 rounded-xl h-64 w-full object-cover"
              />
            )}
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-2xl mb-4">Model Image</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setModelPreview(URL.createObjectURL(file));
                }
              }}
            />

            {modelPreview && (
              <img
                src={modelPreview}
                alt="model"
                className="mt-4 rounded-xl h-64 w-full object-cover"
              />
            )}
          </div>

        </div>

<div className="mt-8 grid md:grid-cols-2 gap-4">
  <input
    type="text"
    placeholder="Product Name"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
  />

  <input
    type="text"
    placeholder="Brand Name"
    value={brandName}
    onChange={(e) => setBrandName(e.target.value)}
    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
  />
</div>

<div className="mt-4 grid md:grid-cols-2 gap-4">
  <input
    type="text"
    placeholder="Describe Product"
    value={productDescription}
    onChange={(e) => setProductDescription(e.target.value)}
    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
  />

  <input
    type="text"
    placeholder="Target Audience"
    value={targetAudience}
    onChange={(e) => setTargetAudience(e.target.value)}
    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
  />
</div>

<div className="mt-8">
  <select
    value={style}
    onChange={(e) => setStyle(e.target.value)}
   
    className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
  >
    <option>Luxury</option>
    <option>Fashion</option>
    <option>Technology</option>
    <option>Social Media</option>
    <option>Cinematic</option>
  </select>
</div>
       <div className="mt-8 flex gap-4">
  <button
    onClick={generateScenes}
    className="flex-1 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-xl font-bold"
  >
    {loading ? "Generating..." : "Generate Ad Scenes"}
  </button>

 <div className="flex gap-2">
  <button
    onClick={copyJson}
    className="px-6 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold"
  >
    Copy JSON
  </button>

  <button
    onClick={downloadJson}
    className="px-6 py-4 rounded-xl bg-green-700 hover:bg-green-600 font-bold"
  >
    Download JSON
  </button>
<button
  onClick={downloadPrompts}
  className="px-6 py-4 rounded-xl bg-blue-700 hover:bg-blue-600 font-bold"
>
  Download TXT
</button>
</div>
</div>
<div className="mt-10 bg-zinc-900 p-6 rounded-xl">
  <h2 className="text-xl font-bold mb-4">AI Output</h2>
  {scenes.length > 0 && (
    <div className="mt-10 space-y-6">
      {scenes.map((scene, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            🎬 Scene {scene.scene}: {scene.title}
          </h2>

          <p><strong>⏱ Duration:</strong> {scene.duration}</p>
          <p><strong>📷 Camera:</strong> {scene.camera}</p>
          <p><strong>💡 Lighting:</strong> {scene.lighting}</p>
          <p><strong>🎭 Action:</strong> {scene.action}</p>
          <p><strong>🎙 Voiceover:</strong> {scene.voiceover}</p>
          <p><strong>🎵 Music:</strong> {scene.music}</p>
          <button
            onClick={() => navigator.clipboard.writeText(scene.prompt)}
            className="mt-3 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
          >
            Copy Prompt
          </button>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Prompt</h3>

            <textarea
              readOnly
              value={scene.prompt}
              className="w-full h-40 p-4 rounded-xl bg-black border border-zinc-700"
            />
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </main>
  );
}