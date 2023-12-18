import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";

const grammar =
  "#JSGF V1.0; grammar colors; public <color> = 3C3 | Bitrem | 3M6 ;";
function App() {
  const [data, setData] = useState<any>([]);
  const [status, setStatus] = useState<string>("idle");
  const [playing, setPlaying] = useState(false);
  const recognition = useMemo(() => new webkitSpeechRecognition(), []);

  useEffect(() => {
    const speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.cotinuous = true;
  }, []);

  useEffect(() => {
    playing ? recognition.start() : recognition.stop();

    recognition.onstart = () => {
      setStatus(() => "recording");
      console.log("onstart");
    };

    recognition.onend = () => {
      setStatus(() => "ended");
      console.log("onend");

      if (playing) {
        recognition.start();
        console.log("restart");
      }
    };

    recognition.onresult = (event: any) => {
      console.log(event);
      const color = event.results[0][0].transcript;
      setData((current: any) => [...current, ["result", color]]);
    };
  }, [playing]);

  const record = useCallback(() => {
    setPlaying((current: boolean) => !current);
  }, [recognition]);

  return (
    <>
      <div>Status: {status}</div>
      <button onClick={record}>Record</button>
      <Table data={data} />
    </>
  );
}

export default App;
