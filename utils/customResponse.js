// status code , msg, response, data
function customResponse(response, status, msg, resdata) {
  return response.status(status).json({
    message: msg,
    data: resdata,
  });
}

export { customResponse };
