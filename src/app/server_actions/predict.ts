"use server";


export async function getPrediction(formData: FormData) {
  

  try {
    const resp = await fetch("http://127.0.0.1:8000/uploadfile", {
      method: "POST",
      body: formData,
    });

    const data = await resp.json();
   console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
