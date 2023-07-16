let ratingInput = document.getElementById("rating")
let ratingError = document.getElementById("rating-error")

ratingInput.addEventListener("input", function (event) {
    if (ratingInput.validity.rangeOverflow) {
        ratingError.textContent = "輸入的數值不能大於 " + ratingInput.max;
        event.preventDefault();
    } else {
        ratingError.textContent = "";
    }
});
