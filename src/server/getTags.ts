import { tagsConfig } from "~/assets/tags";
import { Tag } from "~/assets/types";

export const getTagsSorted = async () => {
  const res = await fetch("/api/tags/get/all", {
    method: "POST",
  });
  const data = await res.json();
  var tagsSorted: Tag[] = [];
  tagsConfig.forEach((tagConfig) => {
    var tag = data.find((t: { name: string }) => t.name === tagConfig.name);

    if (tag) {
      tag = { ...tag, type: tagConfig.type };
      tagsSorted.push(tag);
    }
  });

  return tagsSorted;
};

export const getTagsShowed = async () => {
  const res = await fetch("/api/tags/get/all", {
    method: "POST",
  });
  const data = await res.json();
  var tagsShowed: Tag[] = [];
  tagsConfig.forEach((tagConfig) => {
    const tag = data.find((t: { name: string }) => t.name === tagConfig.name);
    if (tag && tag.show) tagsShowed.push(tag);
  });

  return tagsShowed;
};
