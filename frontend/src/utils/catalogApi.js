import axios from "axios";
import { SummaryApi } from "../common";
import { getCachedData } from "./localCache";

const PRODUCTS_CACHE_KEY = "api_cache:catalog:products:p1l100";
const CATEGORIES_CACHE_KEY = "api_cache:catalog:categories:all";

export const fetchAllProductsCached = async () => {
  return getCachedData({
    key: PRODUCTS_CACHE_KEY,
    ttlMs: 5 * 60 * 1000,
    fetcher: async () => {
      const response = await axios({
        url: `${SummaryApi.getAllProducts.url}?page=1&limit=100`,
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
      });

      return response?.data?.products || [];
    },
  });
};

export const fetchAllCategoriesCached = async () => {
  return getCachedData({
    key: CATEGORIES_CACHE_KEY,
    ttlMs: 10 * 60 * 1000,
    fetcher: async () => {
      const response = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
      });

      return response?.data?.categories || [];
    },
  });
};

