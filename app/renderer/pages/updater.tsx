"use client"

import React from "react";
// import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { Updater } from "@/_shared/components/updater";
import { Button } from "@/_shared/components/button";

import { useRouter } from "next/router";

export default function UpdaterPage() {
  const [progress, setProgress] = useState(undefined)
  const router = useRouter();

  useLayoutEffect(() => {
    setTimeout(() => {
      handleUpdate()
    }, 3000);
  }, [])

  const handleUpdate = () => {
    const { send, on } = window.ipc

    on("get-update", ({ progress, available }) => {

      if(progress){
        setProgress(progress)
        console.log(progress)
      }

      if(available !== undefined && available === false){
        router.push("/home")
      }
    })

    send("get-update", "update")
  }


  const handleChangeUpdate = () => {
    setProgress(old => old !== undefined ? old + 10.980281082 : 0)
  }
  return (
    <React.Fragment>
        <main className="flex flex-col flex-1 p-24 h-screen w-screen bg-gray-900 z-40 fixed">
            <Updater progress={progress}/>
            {/* <Button onClick={handleChangeUpdate}>Update</Button> */}
        </main>
    </React.Fragment>
  );
}
