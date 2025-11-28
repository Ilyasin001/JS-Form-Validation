document.addEventListener("DOMContentLoaded", () => {

//  Ethnicity list
    const ethnicityList = [
        "British", "Irish", "Scottish", "Welsh", "Polish", "Indian", "Pakistani",
        "Bangladeshi", "Chinese", "Caribbean", "African",
    ];

    const ethnicitySelect = document.getElementById("ethnicity");
    ethnicityList.forEach(item => {
        const option = document.createElement("option");
        option.value = item.toLowerCase();
        option.textContent = item;
        ethnicitySelect.appendChild(option);
    });

// Animal list
    const animalList = [
        "Cat", "Dog", "Elephant", "Rabbit", "Lion", "Tiger",
        "Dolphin", "Monkey", "Horse", "Other"
    ];

    const animalSelect = document.getElementById("fav-animal");
    animalList.forEach(animal => {
        const option = document.createElement("option");
        option.value = animal.toLowerCase();
        option.textContent = animal;
        animalSelect.appendChild(option);
    });


// Gender text appear
    const genderInputs = document.querySelectorAll("input[name='gender']");
    const otherGenderBox = document.getElementById("other-gender");

    genderInputs.forEach(input => {
        input.addEventListener("change", () => {
            if (input.id === "other") {
                otherGenderBox.disabled = false;
                otherGenderBox.style.display = "block";
            } else {
                otherGenderBox.disabled = true;
                otherGenderBox.style.display = "none";
                otherGenderBox.value = "";
            }
            updateProgress();
        });
    });

//  Upload image
    const imgUpload = document.getElementById("animal-img");

    imgUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        showToast("Image loaded!");
        updateProgress();
    });


// format the post code (to capslock, to postal code format)
const postcodeInput = document.getElementById("postal-code");

const ukPostcodeRegex = /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/;

postcodeInput.addEventListener("blur", () => {
    let code = postcodeInput.value.toUpperCase().replace(/\s+/g, "");
    
    if (code.length > 3) {
        code = code.slice(0, code.length - 3) + " " + code.slice(-3);
    }

    postcodeInput.value = code;
    // testing input with 
    if (!ukPostcodeRegex.test(code)) {
        postcodeInput.classList.add("error");
        showToast("Invalid UK postcode");
        return;
    }

    postcodeInput.classList.remove("error");
    showToast("Postcode valid");
    updateProgress();
});



// Theme switcher (created in javascript (mainly because i forgot but for diversity too))
const switcher = document.createElement("button");
switcher.id = "theme-button";
switcher.textContent = "Switch Theme";
switcher.style.position = "fixed";
switcher.style.bottom = "20px";
switcher.style.right = "20px";
switcher.style.padding = "10px 15px";
switcher.style.borderRadius = "10px";
switcher.style.zIndex = "9999";
document.body.appendChild(switcher);

let themeMode = 0;
switcher.addEventListener("click", () => {
    themeMode = (themeMode + 1) % 3;

    if (themeMode === 0) {
        document.body.classList.remove("dark-theme", "warm-theme");
        showToast("Theme: Default");
    } else if (themeMode === 1) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("warm-theme");
        showToast("Theme: Dark");
    } else {
        document.body.classList.add("warm-theme");
        document.body.classList.remove("dark-theme");
        showToast("Theme: Warm");
    }
});


// toast notis
function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "black";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "10px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";

    document.body.appendChild(toast);

    setTimeout(() => (toast.style.opacity = "1"), 50);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}

});
