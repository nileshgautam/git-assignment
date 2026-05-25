const form = document.getElementById("toDoForm");
const errorText = document.getElementById("error");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    item_name: document.getElementById("item_name").value,
    item_description: document.getElementById("item_description").value,
  };

  console.log(data);

  try {
    const response = await fetch("http://127.0.0.1:5000/submittodoitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);

    if (result.success) {
      alert("Inserted Successfully");
    } else {
      errorText.innerText = result.error;
    }
  } catch (error) {
    console.log(error);

    errorText.innerText = error.message;
  }
});
