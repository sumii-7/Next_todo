"use client";

import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const allList = async () => {
  const { data } = await supabase.from("list").select("*");
  return data;
};

export const useAllTodoList = (restart: boolean) => {
  return useQuery({
    queryKey: ["todos", restart],
    queryFn: allList,
  });
};
