import React, { useState, useEffect } from "react";
import { projects_EN } from "@/json/projects_EN";
import { projects_ES } from "@/json/projects_ES";
import Filters from "../elements/Filters";
import Github from "@/icons/Github";

import { useAtom } from "jotai";
import { originalAtom } from "@/atom";
import { dataAtom } from "@/atom";
import { languageAtom } from "@/atom";

import Tilt from "react-parallax-tilt";

const Projects = () => {
  const [originalData, setOriginalData] = useAtom(originalAtom);
  const [data, setData] = useAtom(dataAtom);
  const [language, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    setData(originalData);
  }, [originalData]);

  useEffect(() => {
    if (language) {
      setOriginalData(projects_ES);
    } else {
      setOriginalData(projects_EN);
    }
  }, [language]);

  return (
    <div className="mt-4 py-4 pb-4">
      <div className="tracking-tighter text-[25px] font-semibold leading-tighter">
        {language ? <>Todos los proyectos</> : <>All projects</>}
      </div>
      <Filters />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 mt-8">
        {data
          .map((item, index) => (
            <div key={index}>
              <Tilt
                scale={1.04}
                transitionSpeed={2500}
                tiltMaxAngleX={1.1}
                tiltMaxAngleY={1.1}
                className=" cursor-pointer"
              >
                <div
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                  className=" aspect-video w-full bg-no-repeat bg-cover rounded-sm shadow-sm relative bg-top"
                >
                  <a
                    target="_blank"
                    href={item.url}
                    className=" absolute w-full h-full"
                  ></a>
                </div>
              </Tilt>
              <div className=" flex justify-between items-center mt-4">
                <div className="font-bold tracking-tighter text-[14px]">
                  {item.name}
                </div>
                <div className="text-[30px] cursor-pointer hover:scale-110 transition-all hidden">
                  <Github />
                </div>
              </div>
              <div className="text-[#5b5b5b] flex gap-2 leading-none font-medium tracking-tighter text-[13px] mt-[2px]">
                <div className="border-r pr-2 capitalize"> {item.category}</div>
                <div>{item.date}</div>
              </div>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Projects;
