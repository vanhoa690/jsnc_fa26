axios.get("http://localhost:3000/students").then((res) => {
  console.log("tien cua toi dau", res.data);
  document.getElementById("list").innerHTML = res.data
    .map(
      (item) => `
         <tr class="hover:bg-gray-50">
              <td class="px-4 py-2 border border-gray-300">${item.id}</td>
              <td class="px-4 py-2 border border-gray-300">${item.name}</td>
              <td class="px-4 py-2 border border-gray-300">${item.age}</td>
              <td class="px-4 py-2 border border-gray-300">
                <div class="flex items-center justify-center gap-2">
                  <a
                    href="#"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </a>

                  <button
                    onclick=deleteStudent(${item.id})
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
    `,
    )
    .join("");
});

function deleteStudent(id) {
  const result = confirm("Xoa hay ko");
  console.log(result);
  if (result) {
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        alert("Xoa thanh cong");
      })
      .catch(() => {
        alert("Xoa that bai");
      });
  }
}
