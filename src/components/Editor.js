import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import "codemirror/mode/php/php";
import "codemirror/mode/python/python";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/django/django";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/edit/trailingspace";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/runmode/runmode.node";
import "../components/Theme";
import ACTIONS from "../Actions";
import { useSelector } from "react-redux";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const EditorInfo = useSelector((state) => state.EditorStore);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: `${EditorInfo.Lang.currentLanguage}`, json: true },
          theme: `${EditorInfo.Theme.activeTheme}`,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <textarea
      id="realtimeEditor"
      defaultValue="console.log('Hello World')"
      className={style.CodeMirror}
    ></textarea>
  );
};
const style = {
  CodeMirror: {
    fontSize: "270px",
  },
};
export default Editor;
