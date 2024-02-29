import { useComponentData } from "@discoverycms/connector";

interface Data {
  _type: string;
  Film: Film;
  _id: string;
}

interface Film {
  short_description: string;
  ean: string;
  translations: Translations;
  _type: string;
  description: string;
  title: string;
  sku: string;
  keyword: Record<string, string>;
  url: string;
  _id: string;
}

interface Translations {
  en_US: EnUs;
}

interface EnUs {
  description_t: string;
  title_t: string;
}

export const useFilm = (componentId: string) => {
  const data: Data = useComponentData(componentId);

  return {
    image: data.Film.url,
    title: data.Film.title,
    year: data.Film.translations.en_US.title_t,
    description: data.Film.translations.en_US.description_t,
    contentRating: Object.values(data.Film.keyword)[0],
    directors: data.Film.short_description,
    cast: data.Film.description,
    genre: data.Film.sku,
    duration: data.Film.ean,
  };
};
