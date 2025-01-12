"use client";
import { useEffect, useState } from "react";
import StackedBarChart from "../Graphs/BarChart";
import Image from "next/image";
import { Button } from "antd";
// import plus from "./../../../../../../public/assests/plusSign.png";
import Hamburger from "../WorkFlowListPages/hamburgerFun";

import SelectTamplate from "@/Components/WorkFlowListPages/SelectTamplate";
import WorkFlowDropDown from "../WorkFlowListPages/AddWorkFLowDrpDown";

import useProject, { project, setProject } from "@/HOC/Project/Project";
import Overview from "../Overview/Overview";
const WorkFlowList3 = () => {
  const [project, setProject] = useProject([]);

  const projectVariable =
    project.projectName !== "" ? project.projectName : " ";
  // modal function
  const [isAddWorkFlow, setIsAddWorkFlow] = useState(false);

  return (
    <main className="">
      {/*  Workflow */}
      {isAddWorkFlow === false && (
        <section className="flex flex-col w-auto h-auto border rounded">
          <div>
            <div className=" flex flex-row justify-between py-2 items-center w-auto bg-white  px-5">
              <p className="text-black font-sans text-lg not-italic font-semibold ">
                Workflows{" "}
              </p>
              <Hamburger />
            </div>
            {/* decelopment WorkFlow */}

            <section className="flex flex-wrap justify-center items-center bg-white h-[300px] gap-3 px-7 ">
              <div>
                <div className=" flex flex-col w-[632px] h-[185px] text-center   rounded-sm p-3 px-[40px] py-[40px]  justify-center items-center gap-7 border-dashed border-2 border-gray-300">
                  <p className="text-gray-300 font-sans text-[16px] not-italic font-medium leading-6">
                    Right Now there is no workflow, Click on below button to add
                    workflow
                  </p>
                  {/* <WorkFlowDropDown setunSavedTamplate={setunSavedTamplate} /> */}
                  <Button
                    type="primary"
                    size={50}
                    className="bg-blue-500 hover:bg-blue-400"
                    onClick={() => setIsAddWorkFlow(true)}
                  >
                    Add Workflow
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* decelopment workflwo */}
          {/* Graph Sections */}

          <>
            <section className=" flex flex-col mt-3 pt-3 bg-white">
              <div className="flex flex-row justify-between py-2 items-center w-auto bg-white  px-5">
                <p className="text-black font-sans text-lg not-italic font-semibold  ">
                  {projectVariable} Resources
                </p>
                <button className="flex flex-row px-2 py-4 justify-center items-center gap-2 border rounded-sm border-slate-200 bg-gray-50 shadow-sm text-slate-400 text-center font-sans text-sm not-italic font-normal leading-5 h-[22px]">
                  Monthly{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <path
                      d="M4 6.5L8 10.5L12 6.5"
                      stroke="#8C8C8C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400  font-sans text-base not-italic font-normal leading-normal px-5">
                Resources working on Procurement
              </p>

              <div className="flex flex-col justify-start items-end">
                <p className="flex flex-row justify-start  items-center text-black font-sans text-xs not-italic font-normal leading-normal   w-28 gap-1">
                  <span>
                    <Image
                      src="/assets/dimlightblue.png"
                      width={8}
                      height={8}
                    />
                  </span>
                  Pending Task
                </p>
                <p className="text-black font-sans text-xs not-italic font-normal leading-normal flex  justify-items-center gap-1   flex-row justify-start  items-center w-28">
                  <span className="flex">
                    <img src="/assets/lightblue.png" width={8} height={8} />
                  </span>
                  In Progress Tak
                </p>
                <p className="flex flex-row justify-start  items-center text-black font-sans text-xs not-italic font-normal leading-normal   w-28 gap-1">
                  <span>
                    <img src="/assets/darkbluepoint.png" width={8} height={8} />
                  </span>
                  Completed Task
                </p>
              </div>
            </section>

            <div className=" bg-white">
              <StackedBarChart />
            </div>
          </>
        </section>
      )}
      {isAddWorkFlow === true && (
        <section>
         <Overview/>
        </section>
      )}
    </main>
  );
};

export default WorkFlowList3;
