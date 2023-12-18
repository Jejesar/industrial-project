export const changeLampColor = async (color: string) => {
  const body = {
    color: color,
  };
  const res = await fetch("/api/color", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};
