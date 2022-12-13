import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";

import "ace-builds/src-noconflict/theme-solarized_dark";

import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import { useRef } from "react";
import { usePagesStateValue } from "../lib/builder";

export default function Code() {
  const [code, setCode] = useState("");

  const editor = useRef();

  const { handleChange } = useActions();

  function run() {}

  function successHandler(res) {
    const { data } = res;
    console.log(data);
  }

  function errorHandler(err) {
    console.error(err);
  }

  function handleReset() {
    setCode("");
    (editor as any)?.current?.setValue("", 0);
  }

  const pages = usePagesStateValue("pages");

  const pageIndex = usePagesStateValue("pageIndex");

  const page = pages[pageIndex];

  return (
    <>
      <AceEditor
        ref={editor}
        mode={"json"}
        theme={"solarized_dark"}
        placeholder={`Write code here...`}
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={JSON.stringify(page, null, "\t")}
        // height={"70vh"}
        width={"100%"}
        showGutter
        fontSize={15}
      />
    </>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex");
  const pages = usePagesStateValue("pages");

  return {
    handleChange(codeString) {
      const type = "update_all";
      let allPages = [...pages];
      try {
        allPages[pageIndex] = JSON.parse(codeString);
      } catch (e) {}
      dispatch({
        type: type,
        payload: allPages,
        key: "pages",
      });
    },
  };
}
