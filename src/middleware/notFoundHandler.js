export const notFoundHandler = (req, response) => {
  response.status(404).json({ message: "Route not found" });
};
