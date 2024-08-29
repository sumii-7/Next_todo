"use client";

import { useRef, useState } from "react";
import { supabase } from "../utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "@/types/supabase";
import { useAllTodoList } from "@/hooks/AllTodoList";

export type List = Tables<"list">;

export default function TodoList() {
  const listRef = useRef<HTMLInputElement>(null);
  const [restart, setRestart] = useState<boolean>(false);

  /** 리스트 추가 함수 */
  const addList = async (e: React.FormEvent) => {
    e.preventDefault();

    const newList = {
      list: listRef.current?.value,
      isDone: false,
    };

    const { error } = await supabase.from("list").insert(newList);

    if (error) throw new Error(error.message);

    if (listRef.current) {
      listRef.current.value = "";
    }
  };

  const { data: allTodoList } = useAllTodoList(restart);

  const { mutate: addTodoList } = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      setRestart(!restart);
    },
  });

  return (
    <>
      <div className="border-2 border-blue-500 rounded-xl w-[80%] h-[500px] mx-auto p-4 mt-10">
        <div className="flex flex-col justify-center mx-auto w-[90%]">
          <h1 className="flex justify-center text-3xl mb-5">
            김원필의 todolist
          </h1>
          <form
            className="flex justify-center w-[90%] mx-auto mb-5"
            onSubmit={addTodoList}
          >
            <input
              type="text"
              ref={listRef}
              className="border rounded-md outline-none indent-2"
            />
            <button className="ml-2 p-1 rounded-md">등록</button>
          </form>
          <div className="flex flex-col w-[50%] mx-auto gap-2">
            {allTodoList?.map((list) => (
              <div key={list.id} className="flex justify-between">
                <label className="flex gap-2 justify-center">
                  <input type="checkbox" />
                  <div>{list.list}</div>
                </label>
                <button>수정</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
