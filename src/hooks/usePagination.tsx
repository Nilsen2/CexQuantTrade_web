"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/fetchApi";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface PaginationOptions<T> {
  url: string;                   // 请求地址
  pageSize?: number;             // 每页数量
  params?: any;                    // POST 时请求体
  parseData?: (res: any) => T[]; // 解析函数（默认返回 res.data.list）
}

export function usePagination<T = any>(options: PaginationOptions<T>) {
  const {
    url,
    pageSize = 20,
    params = {},
    parseData = (res: any) => res?.data?.list || [],
  } = options;
 const t = useTranslations();
 
  const [page, setPage] = useState(1);
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (force = false) => {
    if (loading || (finished && !force)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post(url, {...params, page, pageSize});
      if (res.code !== 0) throw new Error("fetch failed");

      const newData = parseData(res);

      // 如果返回为空 → 已经到底
      if (!newData.length || newData.length < pageSize) {
        setFinished(true);
      }

      setList((prev) => [...prev, ...newData]);

    } catch (err: any) {
      setError(err.message || "Unknown Error");
    }

    setLoading(false);
  }, [page, pageSize, url, params, finished, loading]);

  // 首次加载
  useEffect(() => {
    loadData();
  }, [page]);

  // 下一页
  const loadMore = () => {
    if (!finished && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // 刷新
  const refresh = async () => {
    setPage(1);
    setList([]);
    setFinished(false);
    try {
      await loadData(true);
      toast.success(t("PubDesc.Success"),{
        duration: 2000
      });
    } catch (error) {
      toast.error(t("PubDesc.Failed"),{
        duration: 2000
      });
    }
  };

  return {
    list,
    loading,
    error,
    finished,
    loadMore,
    refresh,
  };
}
