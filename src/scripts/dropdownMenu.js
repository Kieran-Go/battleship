const createDropdownMenu = () => {
  const init = () => {
    // Select all dropdown menus on the page
    const menus = document.querySelectorAll(".dropdown-menu");

    // Add hover event listeners to toggle dropdown visibility
    menus.forEach((menu) => {
      const button = menu.querySelector(".dropdown-btn");
      const items = menu.querySelector(".dropdown-items-container");

      // Show the dropdown when hovering over the button
      button.addEventListener("mouseenter", () => show(items));

      // Hide the dropdown when mouse leaves the button
      button.addEventListener("mouseleave", () => hide(button, items));

      // Hide the dropdown when mouse leaves the items
      items.addEventListener("mouseleave", () => hide(button, items));
    });

    const show = (items) => {
      items.classList.add("visible");
    };

    const hide = (button, items) => {
      // Check if mouse is not over hovering the button or an item
      if (!button.matches(":hover") && !items.matches(":hover")) {
        items.classList.remove("visible");
      }
    };
  };

  return { init };
};

export default createDropdownMenu;
