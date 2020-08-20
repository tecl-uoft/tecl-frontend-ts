/* Get randomized numbers needed for study setup */
export function getSetup(
  setResult: (result: any) => void,
  setError: (err: any) => void,
  setIsLoaded: ((isLoaded: boolean) => void) | null
) {
  fetch("/api/v1/fairness-study/setup", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      if (setIsLoaded) {
        setIsLoaded(true);
      }

      setResult(result);
    })
    .catch((err) => setError(err));
}

/* Send the results of the study */
export function postResults(
  body: any,
  setResult: (result: any) => void,
  setError: (err: any) => void,
  setIsSent: (sentStatus: boolean) => void
) {
  fetch("/api/v1/fairness-study/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      setIsSent(true);
      setResult(res);
    })
    .catch((err) => setError(err));
}
