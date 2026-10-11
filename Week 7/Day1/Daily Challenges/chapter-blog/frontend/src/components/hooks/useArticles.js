
import useSWR from "swr";//It helps you fetch data from the backend.
import { getArticles, getArticleById } from "../lib/api";
import { seedArticles } from "../../data/articles";

export function useArticles() {
  const result = useSWR("/articles", getArticles);

  return {
    articles: result.data || (result.error ? seedArticles : []),
    isLoading: result.isLoading,
    isError: Boolean(result.error),
  };
}
export function useArticle(id) {
  const result = useSWR(
    id ? `/articles/${id}` : null,
    () => getArticleById(id)
  );

  return {
    article: result.data,
    isLoading: result.isLoading,
    isError: Boolean(result.error),
  };
}
