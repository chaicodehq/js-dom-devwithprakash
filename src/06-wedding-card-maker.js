/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here

  if (!containerElement) {
    return null;
  }

  function handleClick(e) {
    const removeBtn = e.target.closest(".remove-btn");

    const guestItem = removeBtn.closest(".guest-item");

    if (guestItem) {
      guestItem.remove();
    }
  }

  containerElement.addEventListener("click", (e) => handleClick(e));

  function addGuest(name, side) {
    const guestItem = document.createElement("div");
    const nameSpan = document.createElement("span");
    const removeBtn = document.createElement("button");

    guestItem.className = "guest-item";

    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    nameSpan.textContent = name;

    guestItem.setAttribute("data-name", name);
    guestItem.setAttribute("data-side", side);

    guestItem.appendChild(removeBtn);
    guestItem.appendChild(nameSpan);
    containerElement.appendChild(guestItem);

    return guestItem;
  }

  function removeGuest(name) {
    const guest = containerElement.querySelector(
      `.guest-item[data-name="${name}"]`,
    );

    if (guest) {
      guest.remove();
      return true;
    } else {
      return false;
    }
  }

  function getGuests() {
    const elements = containerElement.querySelectorAll(".guest-item");
    const result = [];

    for (const el of elements) {
      const name = el.getAttribute("data-name");
      const side = el.getAttribute("data-side");

      result.push({ name, side });
    }

    return result;
  }

  return {
    addGuest,
    removeGuest,
    getGuests,
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here

  if (!containerElement || !previewElement) {
    return null;
  }

  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  const btn3 = document.createElement("button");

  btn1.className = "theme-btn";
  btn2.className = "theme-btn";
  btn3.className = "theme-btn";

  btn1.textContent = "traditional";
  btn2.textContent = "modern";
  btn3.textContent = "royal";

  btn1.setAttribute("data-theme", "traditional");
  btn2.setAttribute("data-theme", "modern");
  btn3.setAttribute("data-theme", "royal");

  containerElement.appendChild(btn1);
  containerElement.appendChild(btn2);
  containerElement.appendChild(btn3);

  function handleClick(e) {
    const themeBtn = e.target.closest(".theme-btn");
    if (!themeBtn) return;

    const theme = themeBtn.getAttribute("data-theme");

    previewElement.className = theme;

    previewElement.setAttribute("data-theme", theme);
  }

  containerElement.addEventListener("click", (e) => handleClick(e));

  function getTheme() {
    const theme = previewElement.getAttribute("data-theme");

    if (theme) {
      return theme;
    } else {
      return null;
    }
  }

  return { getTheme };
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  function handleClick(e) {
    const target = e.target.closest("[data-editable]");
    if (!target) return;

    const current = cardElement.querySelector(".editing");

    if (current) {
      current.classList.remove("editing");
      current.contentEditable = "false";
    }
    target.classList.add("editing");
    target.contentEditable = "true";
  }

  cardElement.addEventListener("click", handleClick);

  function getContent(field) {
    const elements = cardElement.querySelectorAll("[data-editable]");

    for (const el of elements) {
      if (el.dataset.editable === field) {
        return el.textContent;
      }
    }

    return null;
  }

  return {
    getContent,
  };
}
