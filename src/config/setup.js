export default function getConfig() {
  return {
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem("login_data"))?.token}`,
    }
  }
}