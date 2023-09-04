"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BurgerButton = () => {
    const [toggle, setToggle] = useState(false);

    const onClick = () => {
        setToggle(!toggle)
    }

  return (
      <button
          className={cn("relative h-8 w-8 cursor-pointer md:hidden", {
            "toggle-btn": toggle
          })}
          onClick={onClick}
      >
          <div
              className="before:content-[&quot;&quot;] absolute top-4 -mt-0.5 h-0.5 w-6 rounded bg-rose-700 transition-all duration-500 before:absolute before:h-0.5 before:w-6 before:-translate-x-3 before:-translate-y-2 before:rounded before:bg-rose-700 before:transition-all before:duration-500 after:absolute after:h-0.5 after:w-6 after:-translate-x-3 after:translate-y-2 after:rounded after:bg-rose-700 after:transition-all after:duration-500"
          ></div>
      </button>
  )
}

export default BurgerButton