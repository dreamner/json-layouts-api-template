import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

import React, { useState } from "react";
import { useRef } from "react";
import { usePagesStateValue } from "../lib/builder";

export default function Code() {
  const editor = useRef();

  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex");

  const page = pages[pageIndex];
  const [code, setCode] = useState(() => JSON.stringify(page, null, "\t"));

  const { handleChange: updatePage } = useActions();
  const handleChange = (value) => setCode(value);

  React.useEffect(() => {
    updatePage(code);
  }, [code]);

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
          enableEmmet: false,
          showGutter: false,
        }}
        value={code}
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
