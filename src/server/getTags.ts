// Importation des configurations des tags et du type Tag depuis les modules "~/assets/tags" et "~/assets/types"
import { tagsConfig } from "~/assets/tags";
import { Tag } from "~/assets/types";

// Fonction pour obtenir tous les tags triés
export const getTagsSorted = async () => {
  // Envoi d'une requête POST à l'API pour obtenir tous les tags
  const res = await fetch("/api/tags/get/all", {
    method: "POST",
  });
  // Conversion de la réponse en JSON
  const data = await res.json();
  // Initialisation d'un tableau pour stocker les tags triés
  var tagsSorted: Tag[] = [];
  // Pour chaque configuration de tag, on cherche le tag correspondant dans les données reçues
  tagsConfig.forEach((tagConfig) => {
    var tag = data.find((t: { name: string }) => t.name === tagConfig.name);

    // Si le tag est trouvé, on lui ajoute le type de la configuration et on l'ajoute au tableau des tags triés
    if (tag) {
      tag = { ...tag, type: tagConfig.type };
      tagsSorted.push(tag);
    }
  });

  // Attente de 1 seconde (cette partie semble inutile et pourrait être supprimée)
  setTimeout(() => {
    console.log("waited 1s");
  }, 1000);

  // Retour des tags triés
  return tagsSorted;
};

// Fonction pour obtenir tous les tags à afficher
export const getTagsShowed = async () => {
  // Envoi d'une requête POST à l'API pour obtenir tous les tags
  const res = await fetch("/api/tags/get/all", {
    method: "POST",
  });
  // Conversion de la réponse en JSON
  const data = await res.json();
  // Initialisation d'un tableau pour stocker les tags à afficher
  var tagsShowed: Tag[] = [];
  // Pour chaque configuration de tag, on cherche le tag correspondant dans les données reçues
  tagsConfig.forEach((tagConfig) => {
    const tag = data.find((t: { name: string }) => t.name === tagConfig.name);
    // Si le tag est trouvé et qu'il doit être affiché, on l'ajoute au tableau des tags à afficher
    if (tag && tag.show) tagsShowed.push(tag);
  });

  // Retour des tags à afficher
  return tagsShowed;
};
