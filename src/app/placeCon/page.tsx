"use client";
export default function Page() {
  const classify = async (text: string) => {
    if (!text) return;

    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    const json = await result.json();

    return json;
  };

  async function callme() {
    const response = await classify("This is shit");
    console.log(response);
  }

  return (
    <div>
      This is shit
      <button onClick={callme}>CLick to classify</button>
    </div>
  );
}
