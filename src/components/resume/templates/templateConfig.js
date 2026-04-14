import { Header } from "../section/Header";
import { Summary } from "../section/Summary";
import { Experience } from "../section/Experience";
import { Skills } from "../section/Skills";
import { Projects } from "../section/Projects";
import { Education } from "../section/Education";

export const templateConfig = {
  modern: {
    layoutType: "one-column",
    sections: [
      { component: Header, key: "personal" },
      { component: Summary, key: "summary" },
      { component: Experience, key: "experience" },
      { component: Skills, key: "skills" },
      { component: Projects, key: "projects" },
      { component: Education, key: "education" },
    ]
  },
  professional: {
    layoutType: "two-column",
    left: [
      { component: Header, key: "personal" },
      { component: Skills, key: "skills" },
      { component: Education, key: "education" },
    ],
    right: [
      { component: Summary, key: "summary" },
      { component: Experience, key: "experience" },
      { component: Projects, key: "projects" },
    ]
  }
};

