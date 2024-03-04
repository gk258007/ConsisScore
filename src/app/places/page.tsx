import type { GetServerSideProps } from "next";
import Consscore from "./consscore";

var requestOptions: any = {
  method: "POST",
  redirect: "follow",
};

export async function getdata() {
  const res = await fetch("http://localhost:9000/nearbyplaces", requestOptions);
  const data = await res.json();
  const places = data.places;

  return { places };
}

export default async function page({ data }: { data: any }) {
  const { places } = await getdata();

  return (
    <div>
      <h1 className="mb-2 text-center text-6xl font-bold">
        The Restaurant Lists
      </h1>

      <Consscore listedplace={places} />
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    margin: "10px",
    padding: "10px",
    borderRadius: "8px",
    borderColor: "#f5f5dc",
    borderWidth: "1px",
    borderStyle: "solid",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};
