export function validateEmptyInput(input: HTMLInputElement): number {
  let error = 0;

  if (input.value.length === 0) {
    input.classList.add("error");
    input.setAttribute("placeholder", "Required field");
    error = 1;
  } else {
    input.classList.remove("error");
    input.setAttribute("placeholder", "");
    error = 0;
  }

  return error;
}

export function validatePages(input: HTMLInputElement): number {
  let error = 0;
  const inputValue = Number(input.value);

  if (inputValue < 1) {
    input.classList.add("error");
    input.setAttribute("placeholder", "Not valid pages");
    error = 1;
  } else {
    input.classList.remove("error");
    input.setAttribute("placeholder", "");
    error = 0;
  }

  return error;
}
