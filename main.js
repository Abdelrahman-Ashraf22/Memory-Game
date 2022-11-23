document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Enter your name");

  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedBLock) {
  selectedBLock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();

    MatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function MatchedBlocks(fBlock, secBlock) {
  let triesElement = document.querySelector(".tries span");

  if (fBlock.dataset.technology === secBlock.dataset.technology) {
    fBlock.classList.remove("is-flipped");
    secBlock.classList.remove("is-flipped");

    fBlock.classList.add("matched");
    secBlock.classList.add("matched");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      fBlock.classList.remove("is-flipped");
      secBlock.classList.remove("is-flipped");
    }, duration);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
