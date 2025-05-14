export const getIpAddress = async () => {
  try {
    const response = await fetch("/api/get-ip");
    const data = await response.json();

    return data.ip;
  } catch (error) {
    console.error(error);
  }
};
