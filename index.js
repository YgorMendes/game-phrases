const contaninerExercice = document.getElementById("exercice");
const container1 = document.getElementById("phrases-es");
const container2 = document.getElementById("phrases-en");
const containerlife = document.getElementById("life");
const modal = document.getElementById("modal");

let currentValueFirst;
let currentValueLast;
let life = 3;

containerlife.append(life);

function speek(text) {
  let voices = window.speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[2];
  return speechSynthesis.speak(utterance);
}
speek();

function restartGame() {
  currentValueFirst = undefined;
  currentValueLast = undefined;
  life = 3;
  containerlife.innerHTML = life;

  renderPhares();
  modal.classList.remove("is-visible");
}

function renderPhares() {
  container1.innerHTML = "";
  container2.innerHTML = "";

  exercice1.phrases_es.map((item) => {
    const btn = createBtnPhrase(item.label, item.value);
    return container1.appendChild(btn);
  });

  exercice1.phrases_en.map((item) => {
    const btn = createBtnPhrase(item.label, item.value);
    return container2.appendChild(btn);
  });
}

const exercice1 = {
  phrases_en: [
    { label: "Woman", value: "5-1" },
    { label: "Dog", value: "1-1" },
    { label: "Bob has a cap", value: "2-1" },
    { label: "Rice", value: "6-1" },
    { label: "House", value: "3-1" },
    { label: "Man", value: "4-1" },
  ],
  phrases_es: [
    { label: "Perro", value: "1-2" },
    { label: "Gato", value: "2-2" },
    { label: "Casa", value: "3-2" },
    { label: "Hombre", value: "4-2" },
    { label: "Mujer", value: "5-2" },
    { label: "Arroz", value: "6-2" },
  ],
};

function selected(e) {
  if (currentValueFirst === e.srcElement.id) {
    currentValueFirst = undefined;
  } else if (!currentValueFirst) {
    currentValueFirst = e.srcElement.id;
  }

  if (
    currentValueFirst &&
    !currentValueLast &&
    e.srcElement.id != currentValueFirst
  ) {
    currentValueLast = e.srcElement.id;
  }

  if (currentValueFirst && currentValueLast) {
    const btnFirst = document.getElementById(currentValueFirst);
    const btnLast = document.getElementById(currentValueLast);

    if (btnFirst.id[0] === btnLast.id[0]) {
      btnFirst.parentElement.id === "phrases-en"
        ? speek(btnFirst.innerHTML)
        : speek(btnLast.innerHTML);

      btnFirst.classList.add("is-success");
      btnLast.classList.add("is-success");

      btnFirst.setAttribute("disabled", true);
      btnLast.setAttribute("disabled", true);

      currentValueFirst = undefined;
      currentValueLast = undefined;
    } else {
      life = life - 1;
      containerlife.innerHTML = life;
      btnFirst.classList.add("is-error");
      btnLast.classList.add("is-error");

      setTimeout(() => {
        btnFirst.classList.remove("is-error", "is-selected");
        btnLast.classList.remove("is-error", "is-selected");

        currentValueFirst = undefined;
        currentValueLast = undefined;
      }, 1000);
      if (life === 0) modal.classList.add("is-visible");
    }
  }

  const btnClicked = document.getElementById(e.srcElement.id);
  btnClicked.className.includes("is-selected")
    ? btnClicked.classList.remove("is-selected")
    : btnClicked.classList.add("is-selected");
}

function createBtnPhrase(label, value) {
  const btn = document.createElement("button");
  btn.innerHTML = label;
  btn.setAttribute("id", `${value}`);
  btn.classList.add("btn");
  btn.addEventListener("click", selected);

  return btn;
}

renderPhares();
