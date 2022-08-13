export default (formData = false) => {
  //   const token = store.state.auth_token;
  const contentType = formData ? "multipart/form-data;" : "application/json";
  const reqhead: RequestInit = {
    headers: new Headers({
      "Content-Type": contentType,
      //   "Accept-Language": store.getters.getLanguage,
      //   Authorization: token ? `Token ${token}` : "",
    }),
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  return reqhead;
};
