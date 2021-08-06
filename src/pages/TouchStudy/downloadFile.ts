// add only toys
export const download = (touchStudyInfo: any) => {
  const { trialInformation, participantId } = touchStudyInfo;

  let csvRows = [
    [
      "setup_left_panel",
      "setup_orange_panel_valance",
      "setup_fair_order",
      "setup_fair_actor",
      "trial_type",
      "trial_num",
      "current_video",
      "num_fingers",
      "target",
      "timestamp",
      "touch_category",
      "touchPosition1_x",
      "touchPosition1_y",
      "touchPosition2_x",
      "touchPosition2_y",
      "touchPosition3_x",
      "touchPosition3_y",
      "touchPosition4_x",
      "touchPosition4_y",
      "touchPosition5_x",
      "touchPosition5_y",
    ],
  ];

  trialInformation.map((trialObj: any) => {
    const {
      currentVideo,
      numTouches,
      target,
      timestamp,
      touchPosition,
      trialType,
      studySetup,
      touchCategory,
    } = trialObj;
    let trialRowInfo = [
      studySetup ? studySetup.leftPanel : "",
      studySetup ? studySetup.orangePanelValance : "",
      studySetup ? studySetup.fairOrder : "",
      studySetup ? studySetup.fairActor : "",
      trialType.trialType,
      trialType.trialNum,
      currentVideo,
      numTouches,
      target,
      timestamp,
      touchCategory,
    ];
    [1, 2, 3, 4, 5].forEach((position, idx) => {
      if (position <= touchPosition.length) {
        trialRowInfo = trialRowInfo.concat([
          touchPosition[idx].x,
          touchPosition[idx].y,
        ]);
      } else {
        trialRowInfo = trialRowInfo.concat(["", ""]);
      }
    });
    csvRows.push(trialRowInfo);
  });

  let csvContent = csvRows.map((e) => e.join(",")).join("\n");
  
  const downloadLink = document.createElement("a");
  const downloadBlob = new Blob(["\ufeff", csvContent]);
  const downloadUrl = URL.createObjectURL(downloadBlob);
  downloadLink.href = downloadUrl;
  downloadLink.download =`${new Date().getTime()}_${participantId}.csv` ;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink)

};
