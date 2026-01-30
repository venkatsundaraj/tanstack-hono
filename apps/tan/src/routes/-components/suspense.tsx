import {
  useQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FC } from "react";
import { getUser } from "../login";

interface SuspenseComponentProps {}

const SuspenseComponent: FC<SuspenseComponentProps> = ({}) => {
  const { data } = useSuspenseQuery({
    queryKey: ["userData"],
    queryFn: () => getUser(),
  });
  return (
    <div>
      {data?.map((item, i) => (
        <h4 key={i}>{item.name}</h4>
      ))}
    </div>
  );
};

export default SuspenseComponent;
