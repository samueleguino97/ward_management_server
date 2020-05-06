module.exports = {
  auth: { router: require("./features/auth/router"), path: "/auth" },
  items: { router: require("./features/items/router"), path: "/items" },
  movements: {
    router: require("./features/movements/router"),
    path: "/movements",
  },
  surveys: {
    router: require("./features/surveys/router"),
    path: "/surveys",
  },
  answers: {
    router: require("./features/answers/router"),
    path: "/answers",
  },
};
