"use client";

import { useRef, useState } from "react";
import { supabase } from "../utils/supabase/client";

interface listType {
  // id: number;
  list: string | undefined;
  isDone: boolean;
}

export default function Home() {
  // const [todoList, setTodoList] = useState<listType[]>([]);
  const listRef = useRef<HTMLInputElement>(null);

  // const addList = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newList = {
  //     id: new Date().getTime(),
  //     list: listRef.current?.value,
  //     isDone: false,
  //   };

  //   setTodoList([...todoList, newList]);
  // };

  /** 리스트 추가 함수 */
  const addList = async (e: React.FormEvent) => {
    e.preventDefault();

    const newList = {
      list: listRef.current?.value,
      isDone: false,
    };

    const { error } = await supabase.from("list").insert(newList);

    if (listRef.current) {
      listRef.current.value = "";
    }
  };

  const allList = async () => {
    const { data: allTodoList } = await supabase.from("list").select("*");
  };

  return (
    <>
      <div className="border border-blue-500 w-[80%] mx-auto p-4">
        <div className="flex flex-col justify-center mx-auto w-[90%]">
          <h1 className="flex justify-center text-3xl mb-5">수미의 todolist</h1>
          <form
            className="flex justify-center w-[90%] mx-auto"
            onSubmit={addList}
          >
            <input
              type="text"
              ref={listRef}
              className="border rounded-md outline-none indent-2"
            />
            <button className="ml-2 bg-blue-200 p-1 rounded-md">등록</button>
          </form>
          {/* <div>{todoList.map((list) => list.list)}</div> */}
        </div>
      </div>
    </>
  );
}
