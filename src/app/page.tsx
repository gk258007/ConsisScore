"use client";
import { useState } from "react";
import Place from "./places/page";

var requestOptions: any = {
  method: "POST",
  redirect: "follow",
};

export default async function Page() {
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
      <h1 className="mb-2 text-center text-5xl font-bold">Consistency Calci</h1>
      <button onClick={callme}>click to classify</button>
    </div>
  );
}
