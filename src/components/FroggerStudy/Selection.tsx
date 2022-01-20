import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

interface ISelectionProps {
  nextState: () => void
}

export const Selection: React.FC<ISelectionProps> = (props) => {
  const [videoType, setVideoType] = useState("ad_exp");
  const [partcipantType, setParticpantType] = useState("child");
  const [participantId, setParticipantId] = useState("");
  const [videoDesc, setVideoDesc] = useState("pl_exp");
  const [prac, setPrac] = useState("y")

  const hist = useHistory();

  const onPracTypeChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setPrac(e.currentTarget.value);
    }, []);

  const onParicipantTypeChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setParticpantType(e.currentTarget.value);
    }, []);

  const onVideoTypeChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setVideoType(e.currentTarget.value);
    }, []);

  const onParticipantIdChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setParticipantId(e.currentTarget.value);
    }, []);

  const onVideoGenderTypeChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setVideoDesc(e.currentTarget.value);
    }, []);

  const onGenLinkClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      const genLink =
        `/study/frogger/open/game` +
        `?participant_id=${participantId}` +
        `&p_type=${partcipantType}` +
        `&vid_desc=${videoDesc}` +
        `&vid_t=${videoType}` +
        `&prac=${prac}`;
      hist.push(genLink);
      props.nextState()
    }, [participantId, partcipantType, videoDesc, videoType, hist, prac]);

  return (
    <div className="">
      <div className="flex flex-col space-y-6">
        <h2 className="mt-12 text-xl text-center">
          Manul Mode: <br /> Please choose your specific condition.
        </h2>
        <div className="flex flex-col justify-between w-64 mx-auto mt-24 space-y-4">
          <label className="text-gray-700">Participant Id</label>
          <input
            onChange={onParticipantIdChange}
            value={participantId}
            type="text"
            className="block w-full p-2 mt-1 border border-black rounded-sm "
          />

          <label className="block">
            <span className="text-gray-700">Game Type</span>
            <select
              onChange={onParicipantTypeChange}
              value={partcipantType}
              className="block w-full p-2 mt-1 rounded-sm form-select"
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Instruction Video Age</span>
            <select
              onChange={onVideoTypeChange}
              value={videoType}
              className="block w-full p-2 mt-1 form-select"
            >
              <option value="ad_exp">Adult Explanation</option>
              <option value="ch_exp">Child Explanation</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Instruction Video Method</span>
            <select
              onChange={onVideoGenderTypeChange}
              value={videoDesc}
              className="block w-full p-2 mt-1 form-select"
            >
              <option value="pl_exp">Playful Explanation</option>
              <option value="pe_exp">Pedagogical Explanation</option>
            </select>
          </label>
          <label className="block">
            <span className="text-gray-700">Include Practice Video</span>
            <select
              onChange={onPracTypeChange}
              value={prac}
              className="block w-full p-2 mt-1 form-select"
            >
              <option value="y">Yes</option>
              <option value="n">No</option>
            </select>
          </label>
        </div>
        <button
          onClick={onGenLinkClick}
          className="w-1/4 h-12 mx-auto text-lg bg-orange-400 rounded-md min-w-64 hover:bg-orange-500"
        >
          Generate Link
        </button>
      </div>
    </div>
  );
};
