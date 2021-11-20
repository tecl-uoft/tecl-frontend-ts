import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";

interface ISelectionProps {}

export const Selection = (props: ISelectionProps) => {
  const [videoType, setVideoType] = useState("child");
  const [partcipantType, setParticpantType] = useState("ad_exp");
  const [participantId, setParticipantId] = useState("");
  const [videoGender, setVideoGender] = useState("m_exp");

  const hist = useHistory();

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
      setVideoGender(e.currentTarget.value);
    }, []);

  const onGenLinkClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      const genLink =
        `/study/frogger/open/game` +
        `?participant_id=${participantId}` +
        `&type=${partcipantType}` +
        `&vid_g=${videoGender}` +
        `&vid_t=${videoType}`;

      hist.push(genLink);
    }, [participantId, partcipantType, videoGender, videoType, hist]);

  return (
    <div className="">
      <div className="flex flex-col space-y-6">
        <h2 className="mt-12 text-xl text-center">
          Manul Mode: <br /> Please choose your specfic condition.
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
            <span className="text-gray-700">Instruction Video Gender</span>
            <select
              onChange={onVideoGenderTypeChange}
              value={videoGender}
              className="block w-full p-2 mt-1 form-select"
            >
              <option value="m_exp">Male Explanation</option>
              <option value="f_exp">Female Explanation</option>
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
