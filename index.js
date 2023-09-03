let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// bubble sort function
async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        // bars[j + 1].style.backgroundColor = "lightgreen";
        
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}
 



// insertion sort function
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
    
      await sleep(speedFactor);
      j--;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
   
    await sleep(speedFactor);
  }

  
  return array;
}
async function selectionSort(array){
  let bars = document.getElementsByClassName("bar");
  for(let i= 0;i<array.length-1;i++){
    let smallest = i
    for(let j = i+1; j<array.length; j++){
        if(array[smallest]>array[j]){
          smallest = j;
          bars[smallest].style.height = array[smallest] * heightFactor + "px";
          bars[smallest].style.backgroundColor = "lightgreen";
          await sleep(speedFactor);
        }
    }
    let temp = array[smallest];
    array[smallest] = arr[i];
    array[i] = temp;
   
    //bars[j].innerText = array[j];
    bars[i].style.height = array[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
  }
  return array;
}



sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
   
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "selection":
    selectionSort(unsorted_array);
    break;
    default: 
    bubbleSort(unsorted_array);
   
  }
});
