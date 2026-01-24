import { createFileRoute, useHydrated } from "@tanstack/react-router";
import {
  createServerFn,
  createServerOnlyFn,
  useServerFn,
} from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";

type DummyData = {
  completed: boolean;
  id: number;
  userId: number;
  title: string;
};

const getEnv = createServerOnlyFn(() => process.env.REPO_URL);

const syncGetValues = createServerFn({ method: "GET" }).handler(
  (): string => "hello world",
);
const getValues = createServerFn({ method: "GET" }).handler(
  async (): Promise<DummyData[]> => {
    const val = getEnv();
    console.log(val);
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = (await res.json()) as DummyData[];
    return data.slice(0, 10);
  },
);

export const Route = createFileRoute("/placeholder/")({
  component: RouteComponent,
  loader: async () => {
    return await getValues();
  },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        return new Response(
          JSON.stringify({ message: `Hello, ${body.name}!` }),
        );
      },
    },
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const hydrated = useHydrated();
  const time = hydrated ? Date.now() : "UTC";

  const getValue = useServerFn(syncGetValues);
  const { data: result } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => await syncGetValues(),
  });

  return (
    <div>
      Hello "/placeholder/_root"!
      <p>{result ? result : "loadding.."}</p>
      <button
        onClick={() => {
          fetch("/placeholder/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Tanner" }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        Say Hello
      </button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
        <li>{time}</li>
      </ul>
    </div>
  );
}
