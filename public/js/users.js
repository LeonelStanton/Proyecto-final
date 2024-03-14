document.addEventListener("DOMContentLoaded", function () {
  // users.js

  // Función para eliminar un usuario
  function deleteUser(userId) {
    // Realiza una solicitud al servidor para eliminar el usuario con el ID proporcionado
    // Puedes utilizar Fetch, Axios, u otra biblioteca para hacer la solicitud
    fetch(`api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Una vez que se elimina el usuario, vuelve a cargar la lista de usuarios
        if (data.status === "success") {
          renderUserList();
        } else {
          console.error("Error al eliminar el usuario:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  }

  function changeUserRole(userId) {
    // Implementa la lógica para cambiar el rol del usuario aquí
    // Realiza una solicitud al servidor para actualizar el rol del usuario
    // Puedes utilizar Fetch, Axios, u otra biblioteca para hacer la solicitud
    fetch(`api/users/${userId}/change-role`, {
      method: "PUT", // Utiliza el método HTTP PATCH para actualizar el rol
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Una vez que se actualiza el rol, vuelve a cargar la lista de usuarios
        if (data.status === "success") {
          renderUserList();
        } else {
          console.error("Error al cambiar el rol del usuario:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error al cambiar el rol del usuario:", error);
      });
  }

  // Función para volver a renderizar la lista de usuarios
  function renderUserList() {
    // Realiza una solicitud al servidor para obtener la lista actualizada de usuarios
    // Puedes utilizar Fetch, Axios, u otra biblioteca para hacer la solicitud
    fetch("api/user")
      .then((response) => response.json())
      .then((users) => {
        // Renderiza la lista de usuarios nuevamente en el DOM
        const userListContainer = document.querySelector("div");
        userListContainer.innerHTML = ""; // Borra el contenido actual
        users.forEach((user) => {
          const article = document.createElement("article");
          article.innerHTML = `
                <h2>${user.fullName}</h2>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Role:</b> ${user.role}</p>
                
            `;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Eliminar";
          deleteButton.classList.add("delete-button");
          deleteButton.dataset.id = user.id;
          const changeRoleButton = document.createElement("button");
          changeRoleButton.textContent = "Cambiar Rol";
          changeRoleButton.classList.add("change-role-button");
          changeRoleButton.dataset.id = user.id;

          deleteButton.addEventListener("click", () => deleteUser(user.id));
          changeRoleButton.addEventListener("click", () =>
            changeUserRole(user.id)
          );
          article.appendChild(changeRoleButton);
          article.appendChild(deleteButton);

          userListContainer.appendChild(article);
        });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });
  }

  // Llama a la función para renderizar la lista de usuarios al cargar la página
  window.onload = renderUserList;
});
