const users = [
  { id: "1", name: "venkatsundaraj-onfd" },
  { id: "2", name: "xyxyx" },
];
export const findByUserId = function (id: string) {
  const filterItem = users.filter((i) => i.id === id);
  return { item: filterItem };
};
