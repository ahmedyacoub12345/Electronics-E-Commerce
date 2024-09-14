async function GetCategories() {
  var response = await fetch(
    "https://localhost:44338/API/Categories/GetAllCategories"
  );
  var result = await response.json();
  var container = document.getElementById("dropDownCategory");
  result.forEach((element) => {
    container.innerHTML += `
               <li>
                      <a
                        class="block px-6 py-2 transition-all duration-300 hover:text-primary-500"
                        href="shop-grid.html"
                        onclick="storeCategoryId(${element.categoryId})"
                      >
                         ${element.categoryName}
                      </a>
                    </li>
              
      `;
  });
}
function storeCategoryId(categoryId) {
  localStorage.setItem("CategoryId", categoryId);
  window.location.href("shop-grid.html");
}
GetCategories();